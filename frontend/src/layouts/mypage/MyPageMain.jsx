import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import MyInfoDetail from "../../componenets/mypage/MyInfoDetail";
import Logout from "../../componenets/Logout";
import Footer from "../usermain/Footer";

function Mypage (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    {/* <Logout/> */}
                    <Tab/>
                    <MyInfoDetail/>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Mypage;