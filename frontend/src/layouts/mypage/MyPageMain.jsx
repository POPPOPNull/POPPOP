import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";

function Mypage (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                </div>
            </div>
        </>
    )
}

export default Mypage;