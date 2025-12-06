import "./Cart.css";
import { useOrder } from "../context/OrderContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, total, saveCurrentOrder } = useOrder();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const orderData = await saveCurrentOrder();
    if (orderData) navigate("/complete", { state: orderData });
  };

  return (
    <aside className="cart">
      <h2>장바구니</h2>
      {cart.length === 0 ? (
        <p>선택된 메뉴가 없습니다.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="cart-footer">
            <p>
              총 합계: <strong>{total.toLocaleString()}원</strong>
            </p>
            <button onClick={handlePayment} className="pay-btn">
              결제하기
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
