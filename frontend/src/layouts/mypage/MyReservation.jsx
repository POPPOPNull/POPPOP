import "../usermain/main.css";
import Tab from "../../components/mypage/mypagetab";
import MyResrvDetail from "../../components/mypage/MyResvDetail";
import Logout from "../../components/Logout";
import Footer from "../usermain/Footer";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    {/* <Logout/> */}
                    <Tab/>
                    <MyResrvDetail/>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyReservation;