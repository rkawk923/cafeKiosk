import React, { useMemo } from "react";
import "./Nav.css";
import { useMenu } from "../context/MenuContext";

export default function Nav() {
  const { menus, selectedCategory, filterByCategory } = useMenu();

  // menus에서 카테고리 자동 추출
  const categories = useMemo(() => {
    if (!menus?.length) return [];
    return [...new Set(menus.map((m) => m.category))];
  }, [menus]);

  return (
    <nav className="nav">
      {["전체", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => filterByCategory(cat)}
          className={selectedCategory === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
