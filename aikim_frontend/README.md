# Aikim Frontend - Setup Guide

This guide will walk you through setting up the Aikim Kitchen Assistant frontend project for local development.

## Installation

1. Go to the frontend directory:

   ```bash
   cd aikim_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

### Environment Variables

The application requires specific environment variables for API authentication and configuration. Create a .env file in the root directory:

```bash
# Authentication (temporary development token)
REACT_APP_AUTH_TOKEN=your_auth_token_here
```

## Running the Development Server

### Standard Development Mode

Start the development server:

```bash
npm start
```

This will run the app in development mode at [http://localhost:3000](http://localhost:3000).

### HTTPS Development Mode (for camera access)

For features that require camera access (like receipt scanning), you'll need to run the app in HTTPS mode:

1. Generate SSL certificates (one-time setup):

   ```bash
   # Install mkcert if you don't have it
   npm install -g mkcert

   # Generate certificates
   mkcert create-ca
   mkcert create-cert
   ```

2. Start the server with HTTPS:

   ```bash
   npm run https
   ```

3. Access the app at [https://localhost:3000](https://localhost:3000)

### Testing on Mobile Devices

To test on a mobile device:

1. Start the server with host options:

   ```bash
   # For HTTP (no camera features)
   npm start -- --host 0.0.0.0

   # For HTTPS (with camera features)
   npm run https -- --host 0.0.0.0
   ```

2. Find your computer's IP address:

   ```bash
   # On Windows
   ipconfig

   # On Mac/Linux
   ifconfig | grep "inet "
   ```

3. On your mobile device, connect to the same WiFi network and access:

   ```
   # For HTTP
   http://YOUR_COMPUTER_IP:3000

   # For HTTPS
   https://YOUR_COMPUTER_IP:3000
   ```

## Building for Production

Create a production build:

```bash
npm run build
```

The optimized files will be in the `build` folder.

## Troubleshooting

### Camera Access Issues

- Camera access requires HTTPS on most browsers
- When testing on mobile, ensure you accept any certificate warnings
- For iOS, Safari works best for camera access
