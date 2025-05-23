import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/axios/dist/axios.js";
import "flowbite/dist/flowbite.min.js";

import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import 'react-toastify/dist/ReactToastify.css';

import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);
