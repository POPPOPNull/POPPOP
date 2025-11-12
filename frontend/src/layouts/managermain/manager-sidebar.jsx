import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./manager-sidebar.css"; // admin 스타일
import { useState, useEffect } from "react";

function ManagerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();


  const isMyPopupPath =
    location.pathname.startsWith("/manager/dashboard") ||
    location.pathname.startsWith("/manager/reservations") ||
    location.pathname.startsWith("/manager/mypopup");

  const [isMyPopupOpen, setIsMyPopupOpen] = useState(isMyPopupPath);

  useEffect(() => {
    if (isMyPopupPath) setIsMyPopupOpen(true);
  }, [isMyPopupPath]);

  return (
    <div className="admin-sidebar-layout">
      <div className="admin-side-logo1">
        <div
            className="admin-side-logo1"
            onClick={() => navigate("/manager")}
            style={{ cursor: "pointer" }}
        >
        POPPOP
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
          POPPOP 소개
        </NavLink>

        <NavLink
          to="/manager/popup-register"
          className={({ isActive }) =>
            "admin-side-button" + (isActive ? " active" : "")
          }
        >
          팝업스토어 등록
        </NavLink>

        <div
          className={
            "admin-side-button" + (isMyPopupOpen ? " active" : "")
          }
          onClick={() => setIsMyPopupOpen((prev) => !prev)}
        >
          나의 팝업스토어
          <span
            className="arrow-icon"
            style={{
              transform: isMyPopupOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            &gt;
          </span>
        </div>

        {isMyPopupOpen && (
          <div className="admin-submenu-layout">
            <NavLink
              to="/manager/dashboard"
              className={({ isActive }) =>
                "admin-submenu-item" + (isActive ? " active" : "")
              }
            >
              대시보드
            </NavLink>
            <NavLink
                to="/manager/reservations"
                className={({ isActive }) =>
                "admin-submenu-item" + (isActive ? " active" : "")
                }
            >
                예약 내역
            </NavLink>
            <NavLink
              to="/manager/mypopup"
              className={({ isActive }) =>
                "admin-submenu-item" + (isActive ? " active" : "")
              }
            >
              내 팝업 스토어
            </NavLink>
              <NavLink
                to="/manager/mypopupdet"
                className={({ isActive }) =>
                "admin-submenu-item" + (isActive ? " active" : "")
                }
            >
            내 팝업스토어 상세보기
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerSidebar;