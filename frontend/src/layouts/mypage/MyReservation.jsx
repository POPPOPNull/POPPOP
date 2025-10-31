import "../usermain/main.css";
import Tab from "../../componenets/MyPageTab";
import MyResrvDetail from "../../componenets/MyResvDetail";

function MyReservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Tab/>
                    <MyResrvDetail/>
                </div>
            </div>
        </>
    )
}

export default MyReservation;