import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ton composant principal
import "bootstrap/dist/css/bootstrap.min.css"; // import du CSS Bootstrap

// On dit à React de rendre l'app dans l'élément HTML avec l'id 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
