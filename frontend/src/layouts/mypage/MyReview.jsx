import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";
import Review from "../../componenets/Review"

function MyReview (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                    <Review/>
                    
                </div>
            </div>
        </>
    )
}

export default MyReview;