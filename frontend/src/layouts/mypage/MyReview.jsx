import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
<<<<<<< HEAD
import Review from "../../componenets/mypage/Review"
=======
import Review from "../../componenets/mypage/Review";
import Logout from "../../componenets/Logout";
>>>>>>> JWT/master

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
<<<<<<< HEAD
                    <button className="logout">logout</button>
=======
                    <Logout/>
>>>>>>> JWT/master
                    <Tab/>
                    <Review/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReview;