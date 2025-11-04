import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import Review from "../../componenets/mypage/Review"

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <button className="logout">logout</button>
                    <Tab/>
                    <Review/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default MyReview;