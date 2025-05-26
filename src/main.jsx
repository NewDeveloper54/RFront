import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from 'react-router-dom';




const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);

root.render(
 <BrowserRouter>
      <App />
    </BrowserRouter>
    )


