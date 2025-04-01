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
      const constraints = {
        video: {
          facingMode: "environment", // Use the back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Could not access the camera. Please check permissions and try again."
      );
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
    <div className="receipt-scanner bg-white rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Scan Receipt</h2>
        <p className="text-sm text-gray-500">
          Position the receipt within the frame and tap the button to scan
        </p>
      </div>

      <div className="relative flex-grow flex items-center justify-center bg-gray-900">
        {error ? (
          <div className="text-center p-6">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
              className="absolute w-full h-full object-cover"
              style={{ display: isCameraActive ? "block" : "none" }}
            />

            {/* Blue receipt outline guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-blue-500 w-4/5 h-3/5 rounded-md"></div>
            </div>

            <canvas
              ref={canvasRef}
              className="hidden" // Hide the canvas element
            />
          </>
        )}
      </div>

      <div className="p-4 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center"
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
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isCameraActive && !isScanning
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {isScanning ? (
            <svg
              className="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
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
