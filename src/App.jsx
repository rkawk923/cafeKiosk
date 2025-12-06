// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Order from "./pages/Order";
import Complete from "./pages/Complete";
import { MenuProvider } from "./context/MenuContext";
import { OrderProvider } from "./context/OrderContext";
import OrderHistory from "./pages/OrderHistory";

const App = () => {
  return (
    <OrderProvider>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/order" element={<Order />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
        </Routes>
      </MenuProvider>
    </OrderProvider>
  );
};

export default App;
