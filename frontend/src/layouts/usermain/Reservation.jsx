import "./main.css";
import "./reservation.css"

function Reservation (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="poster">
                        <div className="imgcontainer"><img src="/images/plant.png" alt="포스터" /></div>
                    </div>
                        <div className="title">PLANT exhibition</div>
                        <div>달력 선택 자리입니다..</div>
                        <div>회차 선택 자리입니다..</div>
                        <div>예매 시 주의사항 안내</div>
                </div>
            </div>
        </>
    )
}

export default Reservation;