import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import MyResrvDetail from "../../componenets/mypage/MyResvDetail";
import Logout from "../../componenets/Logout";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Logout/>
                    <Tab/>
                    <MyResrvDetail/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReservation;