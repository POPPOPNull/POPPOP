import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";
import MyResrvDetail from "../../componenets/MyResvDetail";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                    <MyResrvDetail/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReservation;