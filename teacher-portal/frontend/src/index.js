import React from "react";
import ReactDOM from "react-dom/client";  // Use createRoot for React 18
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
