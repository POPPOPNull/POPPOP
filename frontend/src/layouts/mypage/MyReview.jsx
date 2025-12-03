import "../usermain/main.css";
import Tab from "../../components/mypage/MyPageTab";
import Review from "../../components/mypage/Review";
import Logout from "../../components/Logout";
import Footer from "../usermain/Footer";

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    {/* <Logout/> */}
                    <Tab/>
                    <Review/>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyReview;