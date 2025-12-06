import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

//주문 저장
export const saveOrder = async (orderData) => {
  try {
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

//Firestore에서 다음 주문번호 계산
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

//주문 내역 리스트를 가져옴
export const getOrderHistory = async () => {
  const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
