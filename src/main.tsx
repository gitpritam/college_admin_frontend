import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>,
);
