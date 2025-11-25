import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import Review from "../../componenets/mypage/Review";
import Logout from "../../componenets/Logout";
import Footer from "../usermain/Footer";

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Logout/>
                    <Tab/>
                    <Review/>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyReview;