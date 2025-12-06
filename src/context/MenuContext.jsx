// src/context/MenuContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMenus } from "../services/menuService";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // Firebase에서 메뉴 불러오기
  //menuService - fetchMenus
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await fetchMenus();
        setMenus(data);
        setFilteredMenus(data);
      } catch (err) {
        console.error("메뉴 로딩 오류:", err);
      }
    };
    loadMenus();
  }, []);

  // 카테고리별 필터링
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "전체") setFilteredMenus(menus);
    else setFilteredMenus(menus.filter((m) => m.category === category));
  };

  return (
    <MenuContext.Provider
      value={{ menus, filteredMenus, selectedCategory, filterByCategory }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Context 사용 훅
export const useMenu = () => useContext(MenuContext);
