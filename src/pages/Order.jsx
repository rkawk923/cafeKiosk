import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import MenuArea from "../components/MenuArea";
import Cart from "../components/Cart";
import "./Order.css";

export default function Order() {
  return (
    <div className="order-page">
      <Header />
      <Nav />
      <div className="order-content">
        <MenuArea />
        <Cart />
      </div>
    </div>
  );
}
