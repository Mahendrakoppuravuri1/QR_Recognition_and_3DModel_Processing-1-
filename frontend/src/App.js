import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRScanner from "./components/QRScanner";
import ARViewer from "./components/ARViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/view-model" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
