import "./MyResvDetail.css"
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getMyReservations, cancelReservation } from "../../api/ReservationAPI";

function ResvDetail() {
    const [reservations, setReservations] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [error, setError] = useState(null);

    useEffect(()=> {
        getMyReservations()
        .then((data) => {
        const today = new Date();

        const updated = (data || []).map(resv => {
            const visitDateTime = new Date(`${resv.reservationDate}T${resv.reservationTime}`);

            if (
                resv.reservationStatus === "예약완료" &&
                visitDateTime < today
            ) {
                return { ...resv, reservationStatus: "이용완료"};
            }
            return resv;
        });

      setReservations(updated);
      })
      .catch((err) => {
        console.error("예약 내역 조회 실패:", err);
        setError(err);
      });
    }, []);

    const filteredReservations = reservations.filter((resv) => {

        if (filterStatus === "all") return true;

        if (filterStatus === "completed") {
            return resv.reservationStatus === "예약완료";
        }
        if (filterStatus === "cancelled") {
            return resv.reservationStatus === "예약취소";
        }
        if (filterStatus === "used") {
            return resv.reservationStatus === "이용완료";
        }


        return true;
    });

    const handleCancel = async (no) => {
    if (!window.confirm("예약을 취소하시겠습니까?")) return;
        
    {
      await cancelReservation(no);
      alert("예약이 취소되었습니다.");

      getMyReservations().then(setReservations);

    }
  };

    return(

        <>
        <div className="myresv">

        <div className="resvForm">
            <div className="filter">
                <select value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)}>
                    <option value="all">전체내역</option>
                    <option value="completed">예약완료</option>
                    <option value="cancelled">예약취소</option>
                    <option value="used">이용완료</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th style={{width:"40%"}}>팝업명</th>
                        <th style={{width:"40%"}}>예약 정보</th>
                        <th style={{width:"20%"}}>상태</th>
                        {/* <th style={{width:"15%"}}>예약취소</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.length=== 0 && (
                        <tr>
                            <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                                예약 내역이 없습니다.
                            </td>
                        </tr>
                    )}

                    {filteredReservations.map((resv) => (
                        <tr key={resv.reservationNo}>
                            <td className="popup-info">
                                <div className="poster">
                                    <img src="/images/plant.png" alt="팝업포스터"/>
                                </div>
                                <div className="details">
                                    <p className="title">{resv.popupName}</p>
                                    {/* <p className="place">위치</p> */}
                                </div>
                            </td>
                        <td className="reserve-info">
                            <div className="info">
                                <span className="label">예약번호</span>
                                <span className="value">{resv.reservationNo}</span>
                            </div>
                            <div className="info">
                                <span className="label">방문일</span>
                                <span className="value">{resv.reservationDate}</span>
                            </div>
                            <div className="info">
                                <span className="label">방문시간</span>
                                <span className="value">{resv.reservationTime}</span>
                            </div>
                            <div className="info">
                                <span className="label">인원</span>
                                <span className="value">{resv.reservationPersonnel}명</span>
                            </div>
                        </td>
                        <td>
                            <span className={`status ${resv.reservationStatus === '예약완료' ? 'completed' : 'cancelled'}`}>
                                {resv.reservationStatus}
                            </span>
                            {resv.reservationStatus === "예약완료" && (
                                <button className="cancelBtn" onClick={() => handleCancel(resv.reservationNo)}>
                                취소
                                </button>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
            
        </div>
        </>
    )
}
export default ResvDetail;