import { useState } from "react";
import { Link } from "react-router-dom";
import "./admin-sidebar.css";

const poppopMenus = [
    { name: "메인", icon: "/public/icons/home.png", subMenus: [
        {name : "대시보드(사용자)", path: "/admin"},
        {name : "대시보드(가맹점)", path: "/admin/manager-main"}
        ]
    },

    { name: "회원목록", icon: "/public/icons/member-list.png", subMenus: [
        {name: "사용자 회원 목록", path: "/admin/members"},
        {naem: "가맹점 회원 목록", path: "/admin/manager-members"}
        ]
    },

    { name: "리뷰내역", icon: "/public/icons/feedback-review.png", subMenus: [{name: "리뷰 전체 조회", path: "/admin/reviews"}]},

    { name: "예약내역", icon: "/public/icons/calendar-check.png", subMenus: [
        {name: "사용자 예약 내역", path: "/admin/reservation"},
        {name: "가맹점 예약 내역", path: "/admin/manager-reservation"}
        ]
    },

    { name: "팝업목록", icon: "/public/icons/shop.png", subMenus: [{name: "팝업 스토어 목록", path: "/admin/manager-popup"}]},
];

function AdminSidebar(){

    // 메뉴 상태 저장
    const [openMenu, setOpenMenu] = useState(null);

    // 메뉴 클릭 시 실행 함수 - 이미 열려있는 메뉴를 다시 클릭하면 닫고, 아니면 새로 열기
    const handleMenuClick = (menuSelect) => {
        setOpenMenu(openMenu === menuSelect ? null : menuSelect);
    };

    const renderMenus = (menus, prefix) => {
        return menus.map((menu) => {
            const menuSelect = `${prefix}_${menu.name}`;
            const isOpen = openMenu === menuSelect;

            return (
                <div key={menuSelect}>
                    <div className={`admin-side-button ${isOpen ? 'active' : ''}`} onClick={() => handleMenuClick(menuSelect)}>
                        <img src={menu.icon} alt={menu.name} className="side-icon"/>
                        {menu.name}
                        <img
                            src="/public/icons/angle-small-right.png"
                            className="arrow-icon"
                            alt="arrow"
                        />
                    </div>
                    {/* isOpen이 true + 하위 메뉴가 존재할 때 하위 메뉴 렌더링 */}
                    {isOpen && menu.subMenus.length > 0 && (
                        <div className="admin-submenu-layout">
                            {menu.subMenus.map((subMenu) => (
                                <Link to={subMenu.path} key={subMenu.name} className="admin-submenu-item">
                                    {subMenu.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        });
    };

    return(
        <>
        <div className="admin-sidebar-layout">
            <div className="admin-side-logo1">POPPOP</div>
            <div className="admin-sidebutton-layout">
                {renderMenus(poppopMenus, 'POPPOP')}
            </div>
        </div>
        </>
    );
}

export default AdminSidebar