// src/services/menuService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Firestore에서 모든 메뉴를 가져옵니다.
 * @returns {Promise<Array>} 메뉴 리스트
 */
export const fetchMenus = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "menus"));
    const menus = querySnapshot.docs.map((doc) => ({
      id: doc.data().id, // Firestore의 id 필드 (ex: p1)
      name: doc.data().name, // ex: "아메리카노"
      category: doc.data().category,
      price: doc.data().price,
      img: doc.data().img, // ex: "coffeeImg"
    }));
    return menus;
  } catch (error) {
    console.error("🔥 메뉴 불러오기 실패:", error);
    throw error;
  }
};
