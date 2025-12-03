import "../usermain/main.css";
import Tab from "../../components/mypage/MyPageTab";
import MyInfoDetail from "../../components/mypage/MyInfoDetail";
import Logout from "../../components/Logout";
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