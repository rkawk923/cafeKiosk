import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <OrderProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </OrderProvider>
  </BrowserRouter>
);
