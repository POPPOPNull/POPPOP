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
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default Mypage;