import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import { getOrderHistory } from "../services/orderService";
import "./OrderHistory.css";

/* ────────────────────────────────
   🔧 검색 및 정렬 관련 함수
──────────────────────────────── */
const filterOrders = (orders, search) => {
  const keyword = search.trim();
  if (!keyword) return orders;
  return orders.filter((o) => String(o.orderNo).includes(keyword));
};

const sortOrders = (orders, sortAsc) => {
  const sortedOrders = [...orders];
  sortedOrders.sort((a, b) => {
    const av = String(a.orderNo);
    const bv = String(b.orderNo);
    if (av === bv) return 0;
    return sortAsc ? (av < bv ? -1 : 1) : av > bv ? -1 : 1;
  });
  return sortedOrders;
};

/* ────────────────────────────────
   📄 OrderHistory 컴포넌트
──────────────────────────────── */
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrderHistory();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  // ✅ useMemo로 검색 및 정렬 결과 캐싱
  const displayedOrders = useMemo(() => {
    const filtered = filterOrders(orders, search);
    return sortOrders(filtered, sortAsc);
  }, [orders, search, sortAsc]);

  return (
    <div className="order-page">
      <Header title="결제 내역" />

      {/* 검색 및 정렬 컨트롤 */}
      <div className="order-controls">
        <input
          type="text"
          className="order-search"
          placeholder="주문번호 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="order-sort-buttons">
          <button
            className={`sort-btn ${sortAsc ? "active" : ""}`}
            onClick={() => setSortAsc(true)}
            aria-label="주문번호 오름차순"
          >
            오름차순
          </button>
          <button
            className={`sort-btn ${!sortAsc ? "active" : ""}`}
            onClick={() => setSortAsc(false)}
            aria-label="주문번호 내림차순"
          >
            내림차순
          </button>
        </div>
      </div>

      <div className="order-list">
        {displayedOrders.map((order) => (
          <div key={order.id} className="order-card">
            {/* 상단 */}
            <div className="order-top">
              <span className="order-no">주문번호 {order.orderNo}</span>
              <span className="order-total">
                ₩{order.total.toLocaleString()}
              </span>
            </div>

            {/* 메뉴 목록 */}
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

            {/* 하단 정보 */}
            <div className="order-footer">
              <span>{order.orderType}</span>
              <span>{new Date(order.orderTime).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
