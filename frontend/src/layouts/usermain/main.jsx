import "./main.css"
import DragComp from "../../componenets/movingUI";

function User (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <div>유저메인 컴포넌트 자리</div>
                    <DragComp/>
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default User;