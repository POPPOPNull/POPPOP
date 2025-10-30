import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                    <h1>예약내역</h1>
                </div>
            </div>
        </>
    )
}

export default MyReservation;