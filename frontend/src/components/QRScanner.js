import React, { useState } from "react";
import QrScanner from "qr-scanner";

const QRScanner = () => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        scanQRCodeFromImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanQRCodeFromImage = (imageUrl) => {
    const image = new Image();
    image.src = imageUrl;
  
    image.onload = () => {
      // Scan QR code from image using QrScanner
      QrScanner.scanImage(image)
        .then((result) => {
          setQrCodeData(result);
          console.log("QR Code Data: ", result);
          // Redirect to the URL found in the QR code
          window.location.href = result;
        })
        .catch((err) => {
          console.error("Error scanning QR code from image:", err);
          alert("No QR code detected. Please try another image.");
        });
    };
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1>Scan QR Code from Image</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {qrCodeData && (
        <div>
          <h3>Scanned QR Code Data:</h3>
          <p>{qrCodeData}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
