import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import Review from "../../componenets/mypage/Review";
import Logout from "../../componenets/Logout";

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Logout/>
                    <Tab/>
                    <Review/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReview;