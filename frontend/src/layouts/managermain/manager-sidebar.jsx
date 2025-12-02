import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./manager-sidebar.css"; // admin 스타일
import { useState, useEffect } from "react";
import AdminLogout from "../../componenets/AdminLogout";

function ManagerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();


  const isMyPopupPath =
    location.pathname.startsWith("/manager/dashboard") ||
    location.pathname.startsWith("/manager/reservations") ||
    location.pathname.startsWith("/manager/mypopup");

  const [isMyPopupOpen, setIsMyPopupOpen] = useState(isMyPopupPath);

  useEffect(() => {
    if (isMyPopupPath) {
      setIsMyPopupOpen(true);
    } else {
      setIsMyPopupOpen(false);
    }
  }, [isMyPopupPath]);

  return (
    <div className="admin-sidebar-layout">
      <div className="admin-side-logo1">
        <div
            className="admin-side-logo1"
            onClick={() => navigate("/manager")}
            style={{ cursor: "pointer" }}
        >
        POPPOP BIZ
        </div>
      </div>

      <div className="admin-sidebutton-layout">
        <NavLink
          to="/manager"
          end
          className={({ isActive }) =>
            "admin-side-button" + (isActive ? " active" : "")
          }
        >
          <img src="/icons/home.png" alt="home" className="side-icon" />
          POPPOP 소개
        </NavLink>

        <NavLink
          to="/manager/popupstore"
          className={({ isActive }) =>
            "admin-side-button" +
            (isActive && !isMyPopupOpen ? " active" : "")  
            //isMyPopupOpen이 false일 때만 active 적용 : 다른 메뉴 클릭시 이전 메뉴 비 활성화 됨
          }
        >
          <img
            src="/icons/store-buyer.png" alt="store-buyer" className="side-icon"
          />
          팝업스토어 등록
        </NavLink>

        <NavLink
          to="/manager/mypopup"  // 나의 팝업스토어 메인 페이지
          className={({ isActive }) =>
            "admin-side-button" + (isActive ? " active" : "")
          }
        >
          <img src="/icons/shop.png" alt="shop" className="side-icon" />
          나의 팝업스토어
        </NavLink>

      </div>
      <div className="admin-logout">
            <AdminLogout />
            </div>
    </div>
  );
}

export default ManagerSidebar;