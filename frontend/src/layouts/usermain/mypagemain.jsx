import "./main.css";
import Tab from "../../componenets/mypagetab";

function Mypage (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div>
                        <Tab/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mypage;