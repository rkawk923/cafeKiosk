import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Firestore에 주문을 저장합니다.
 * Context에서 전달받은 orderData 형식을 그대로 받습니다.
 */
export const saveOrder = async (orderData) => {
  try {
    // ✅ DB용 변환은 여기서만 담당
    const payload = {
      orderNo: orderData.orderNo,
      cafeName: orderData.cafeName,
      orderType: orderData.orderType,
      total: orderData.total,
      orderTime: orderData.orderTime || new Date().toISOString(),
      items: orderData.items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        qty: item.qty,
        img: item.img || null,
      })),
    };

    const docRef = await addDoc(collection(db, "orders"), payload);
    console.log("✅ 주문 저장 완료:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("🔥 주문 저장 실패:", error);
    throw error;
  }
};

/**
 * Firestore에서 다음 주문번호 계산
 */
export const fetchNextOrderNo = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    if (querySnapshot.empty) return 1;

    const orders = querySnapshot.docs.map((doc) => doc.data());
    const lastOrder = orders.sort(
      (a, b) => parseInt(b.orderNo) - parseInt(a.orderNo)
    )[0];
    return parseInt(lastOrder.orderNo) + 1;
  } catch (error) {
    console.error("🔥 주문번호 조회 실패:", error);
    return 1;
  }
};

export const getOrderHistory = async () => {
  const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
