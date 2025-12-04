import "../usermain/main.css";
import "./Reservation.css";
import Calendar from "../../components/reservation/Calender";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { selectPopupStoreDetails } from "../../api/PopupStoreAPI"

function Reservation (){

    const {popupNo} = useParams();

    const [popup, setPopup] = useState({});

    useEffect(()=>{
            selectPopupStoreDetails(popupNo)
            .then(data=>{
                console.log("data",data)
                setPopup(data)
            })
    
            
        },[])

    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="postercontainer">
                        <div className="poster">
                            <div className="imgcontainer">
                                <img src={`/poster/poster_${popupNo}.png`} alt="포스터" />
                            </div>
                        </div>
                    </div>
                        <div className="title">{popup.name}의 예약페이지</div>
                    <div className="resvdetails">
                        <div className="resvnotice">
                            <h3>※ 예약 시 주의사항 안내</h3>
                            <p>- 예약은 1시간 단위로 진행됩니다.</p>
                            <p>- 예약 1회당 예악자 본인 1인 2매 예약이 가능합니다.</p>
                            <p>- 예약된 입장 시각의 10분 전후로 대기 후 입장 가능하며, 이후에는 입장이 어려울 수 있는 점 양해 부탁드립니다.</p>
                            <p>- 예약 완료 후 일정 변경을 희망하시는 경우 기존 예약 취소 후 신규 예약을 부탁드립니다.</p>
                            <p>- 안전한 관람을 위하여 현장 상황에 따라 입장이 지연될 수 있습니다.</p>
                        </div>
                        <Calendar/>
                        <div style={{height:"200px"}}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservation;