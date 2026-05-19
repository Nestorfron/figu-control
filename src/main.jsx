import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "flag-icons/css/flag-icons.min.css";
import './styles/index.css';

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Hay una nueva versión disponible. ¿Quieres actualizar?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("La aplicación está lista para funcionar offline 🚀");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
      <App />

  </React.StrictMode>
);
