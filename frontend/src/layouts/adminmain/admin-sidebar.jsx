import "./admin-sidebar.css"

function AdminSidebar(){

    return(
        <>
        <div className="admin-sidebar-layout">
            <div className="admin-side-logo1">POPPOP</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button"><img src='/public/icons/home.png' alt="홈" className="side-icon"/>메인</div>
                <div className="admin-side-button"><img src='/public/icons/member-list.png' alt="회원" className="side-icon"/>회원목록</div>
                <div className="admin-side-button"><img src='/public/icons/feedback-review.png' alt="리뷰" className="side-icon"/>리뷰내역</div>
                <div className="admin-side-button"><img src='/public/icons/calendar-check.png' alt="예약" className="side-icon"/>예약내역</div>
            </div>

            <div className="admin-side-logo2">POPTNER</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button"><img src='/public/icons/home.png' alt="홈" className="side-icon"/>메인</div>
                <div className="admin-side-button"><img src='/public/icons/member-list.png' alt="회원" className="side-icon"/>회원목록</div>
                <div className="admin-side-button"><img src='/public/icons/shop.png' alt="팝업" className="side-icon"/>팝업목록</div>
                <div className="admin-side-button"><img src='/public/icons/calendar-check.png' alt="예약" className="side-icon"/>예약내역</div>
            </div>
            
        </div>
        </>
    )
}

export default AdminSidebar