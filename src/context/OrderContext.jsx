import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { fetchNextOrderNo, saveOrder } from "../services/orderService";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderType, setOrderType] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const orderNoRef = useRef(1);

  //마지막 주문번호 불러오기
  //orderService - fetchNextOrderNo
  useEffect(() => {
    const loadOrderNo = async () => {
      orderNoRef.current = await fetchNextOrderNo();
    };
    loadOrderNo();
  }, []);

  //메뉴 총 금액 계산
  useEffect(() => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const selectOrderType = (type) => setOrderType(type);

  //MenuItem 누르면 장바구니에 추가
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  //CartItem 증가
  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  //CartItem 감소
  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

  //쇼핑카트 비우기
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  // 주문 완료
  //orderService - saveOrder
  const saveCurrentOrder = async () => {
    if (cart.length === 0) return null;

    const orderData = {
      orderNo: orderNoRef.current.toString().padStart(6, "0"),
      cafeName: "연암 카페",
      orderType,
      items: cart,
      total,
      orderTime: new Date().toISOString(),
    };

    try {
      await saveOrder(orderData); // 서비스로 전달
      orderNoRef.current += 1;
      clearCart();
      return orderData;
    } catch (error) {
      console.error("🔥 주문 저장 실패:", error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderType,
        cart,
        total,
        selectOrderType,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        saveCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

//Context 사용 훅
export const useOrder = () => useContext(OrderContext);
