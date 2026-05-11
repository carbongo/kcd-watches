import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/App";
import "./styles/tailwind.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root element was not found.");
}

document.documentElement.classList.add("min-h-full");
document.body.classList.add("m-0", "min-h-full", "bg-black");
root.classList.add("min-h-full");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
