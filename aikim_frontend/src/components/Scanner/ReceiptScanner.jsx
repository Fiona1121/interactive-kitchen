// src/components/Scanner/ReceiptScanner.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReceiptScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the camera when component mounts
    startCamera();

    // Clean up when unmounting
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in your browser");
      }

      // Try to get a list of available devices first (helps with iOS permission flow)
      try {
        await navigator.mediaDevices.enumerateDevices();
      } catch (enumError) {
        console.warn("Could not enumerate devices:", enumError);
        // Continue anyway, as some devices don't support enumeration
      }

      // Configure camera constraints for optimal cross-device compatibility
      const constraints = {
        video: {
          facingMode: "environment", // Use the back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
          // Add additional constraints for better mobile camera handling
          aspectRatio: { ideal: 4 / 3 },
          frameRate: { ideal: 30 },
        },
      };

      // For iOS devices, we need to be more specific sometimes
      const userAgent = navigator.userAgent;
      const isiOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

      if (isiOS) {
        console.log("iOS device detected, using specific constraints");
        // On iOS, sometimes simpler constraints work better
        constraints.video = {
          facingMode: "environment",
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
        };
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setIsCameraActive(true);
                setError(null);
              })
              .catch((playError) => {
                console.error("Error playing video:", playError);
                setError("Could not play video stream. Please try again.");
              });
          }
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      // Provide more specific error messages based on the error
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setError(
          "Camera access was denied. Please allow camera access and try again."
        );
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
      ) {
        setError(
          "No camera found on your device, or the camera is already in use."
        );
      } else if (
        err.name === "NotReadableError" ||
        err.name === "TrackStartError"
      ) {
        setError("Your camera is already in use by another application.");
      } else if (err.name === "OverconstrainedError") {
        setError(
          "The requested camera settings are not supported by your device."
        );
      } else {
        setError(
          "Could not access the camera: " + (err.message || "Unknown error")
        );
      }

      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureReceipt = () => {
    if (!canvasRef.current || !videoRef.current) return;

    setIsScanning(true);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data as a base64 string
    const imageData = canvas.toDataURL("image/jpeg");

    // Simulate receipt scanning process (would be replaced with actual OCR)
    setTimeout(() => {
      // For demo purposes, we'll use dummy data
      const scannedItems = [
        { name: "Fresh garlic", quantity: 1.2, unit: "kg" },
        { name: "Cucumbers", quantity: 1, unit: "pc" },
        { name: "Beetroot", quantity: 1, unit: "pc" },
        { name: "Shrimp", quantity: 400, unit: "g" },
        { name: "Tomato", quantity: 3, unit: "pc" },
        { name: "Lemon", quantity: 2, unit: "pc" },
      ];

      setIsScanning(false);

      // Navigate to the confirmation page with the scanned items
      navigate("/scan-confirmation", {
        state: {
          items: scannedItems,
          receipt: imageData,
        },
      });
    }, 2000); // Simulate scanning delay
  };

  const handleRetry = () => {
    setError(null);
    startCamera();
  };

  return (
    <div className="bg-white rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Scan Receipt</h2>
        <p className="text-sm text-gray-500">
          Position the receipt within the frame and tap the button to scan
        </p>
      </div>

      <div className="relative flex-grow flex items-center justify-center bg-gray-900 m-4">
        {error ? (
          <div className="text-center p-6">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute w-full h-full object-cover"
              style={{ display: isCameraActive ? "block" : "none" }}
            />

            {!isCameraActive && !error && (
              <div className="flex flex-col items-center justify-center text-white">
                <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                <p>Accessing camera...</p>
              </div>
            )}

            {/* Blue receipt outline guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-blue-500 w-2/5 h-4/5 rounded-md"></div>
            </div>

            <canvas
              ref={canvasRef}
              className="hidden" // Hide the canvas element
            />
          </>
        )}
      </div>

      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={captureReceipt}
          disabled={!isCameraActive || isScanning}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isCameraActive && !isScanning
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isScanning ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
        <div className="w-12"></div> {/* Empty div for flex spacing */}
      </div>
    </div>
  );
};

export default ReceiptScanner;
