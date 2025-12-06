import React from "react";
import "./MenuArea.css";
import MenuItem from "./MenuItem";
import { useMenu } from "../context/MenuContext";

export default function MenuArea() {
  const { filteredMenus } = useMenu();

  return (
    <div className="menu-area">
      {filteredMenus.length > 0 ? (
        filteredMenus.map((item) => <MenuItem key={item.id} product={item} />)
      ) : (
        <p className="menu-empty">메뉴를 불러오는 중...</p>
      )}
    </div>
  );
}
