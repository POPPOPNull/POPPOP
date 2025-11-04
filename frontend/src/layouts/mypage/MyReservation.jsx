import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import MyResrvDetail from "../../componenets/mypage/MyResvDetail";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <button className="logout">logout</button>
                    <Tab/>
                    <MyResrvDetail/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReservation;