import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import MyResrvDetail from "../../componenets/mypage/MyResvDetail";
import Logout from "../../componenets/Logout";
import Footer from "../usermain/Footer";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Logout/>
                    <Tab/>
                    <MyResrvDetail/>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyReservation;