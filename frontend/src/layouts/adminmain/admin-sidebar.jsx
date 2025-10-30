import "./admin-sidebar.css"
import HomeIcon from '../../assets/icons/home1.svg';
import MembersIcon from '../../assets/icons/members.svg';
import ReviewIcon from '../../assets/icons/review.svg';
import ReservationIcon from '../../assets/icons/reservation.svg';
import ShopIcon from '../../assets/icons/shop.svg';

function AdminSidebar(){




    return(
        <>
        <div className="admin-sidebar-layout">
            <div className="admin-side-logo1">POPPOP</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button"><img src={HomeIcon} alt="홈" className="side-icon"/>메인</div>
                <div className="admin-side-button"><img src={MembersIcon} alt="회원" className="side-icon"/>회원목록</div>
                <div className="admin-side-button"><img src={ReviewIcon} alt="리뷰" className="side-icon"/>리뷰내역</div>
                <div className="admin-side-button"><img src={ReservationIcon} alt="예약" className="side-icon"/>예약내역</div>
            </div>

            <div className="admin-side-logo2">POPTNER</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button"><img src={HomeIcon} alt="홈" className="side-icon"/>메인</div>
                <div className="admin-side-button"><img src={MembersIcon} alt="회원" className="side-icon"/>회원목록</div>
                <div className="admin-side-button"><img src={ShopIcon} alt="팝업" className="side-icon"/>팝업목록</div>
                <div className="admin-side-button"><img src={ReservationIcon} alt="예약" className="side-icon"/>예약내역</div>
            </div>
            
        </div>
        </>
    )
}

export default AdminSidebar