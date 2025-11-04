import "../usermain/main.css";
import Tab from "../../componenets/mypage/MyPageTab";
import MyInfoDetail from "../../componenets/mypage/MyInfoDetail";

function Mypage (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <button className="logout">logout</button>
                    <Tab/>
                    <MyInfoDetail/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default Mypage;