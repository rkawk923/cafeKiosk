import "./OrderCard.css";

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-top">
        <span className="order-no">주문번호 {order.orderNo}</span>
        <span className="order-total">₩{order.total.toLocaleString()}</span>
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <div key={item.id} className="order-item">
            <span className="item-name">
              {item.name} × {item.qty}
            </span>
            <span className="item-price">
              ₩{(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <span>{order.orderType}</span>
        <span>{new Date(order.orderTime).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OrderCard;
