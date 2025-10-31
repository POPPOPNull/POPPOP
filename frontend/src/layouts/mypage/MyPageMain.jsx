import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";
import MyInfoDetail from "../../componenets/MyInfoDetail";

function Mypage (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                    <MyInfoDetail/>
                </div>
            </div>
        </>
    )
}

export default Mypage;