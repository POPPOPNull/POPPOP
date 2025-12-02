import "./MyResvDetail.css"
import { useEffect,useState } from "react";
import { getMyReservations, cancelPaidReservation } from "../../api/ReservationAPI";
import { Link } from "react-router-dom";

function ResvDetail() {
    const [reservations, setReservations] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [error, setError] = useState(null);

    const applyStatusByDate = (data) => {
    const today = new Date();

    return (data || []).map((resv) => {
      const visitDateTime = new Date(
        `${resv.reservationDate}T${resv.reservationTime}`
      );

      if (
        (resv.reservationStatus === "예약완료" || resv.reservationStatus === "결제완료") &&
        visitDateTime < today
      ) {
        return { ...resv, reservationStatus: "이용완료" };
      }
      return resv;
    });
  };
  
    const fetchReservations = () => {
        getMyReservations()
            .then((data) => {
                const updated = applyStatusByDate(data);
                setReservations(updated);
            })
            .catch((err) => {
                console.error("예약 내역 조회 실패:", err);
                setError(err);
            });
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const getPosterUrl = (popupNo) =>
    `/poster/poster_${popupNo}.png`;

    const filteredReservations = reservations.filter((resv) => {
        if (filterStatus === "all") return true;
        if (filterStatus === "completed") {
            // '예약완료' 필터 선택 시 '결제완료' 상태도 함께 보여줌
            return resv.reservationStatus === "예약완료" || resv.reservationStatus === "결제완료";
        }
        if (filterStatus === "cancelled") {
            return resv.reservationStatus === "예약취소";
        }
        if (filterStatus === "used") {
            return resv.reservationStatus === "이용완료";
        }
        return true;
    });

    const handleCancel = async (reservationNo) => {
        if (!window.confirm("결제된 예약입니다. 취소 시 환불 처리됩니다. 계속하시겠습니까?")) return;
        
        try {
            const response = await cancelPaidReservation(reservationNo);
            alert(response || "예약이 성공적으로 취소되었습니다.");
            // 예약 목록 다시 불러오기
            fetchReservations();
        } catch (err) {
            const errorMessage = err.response ? err.response.data : "예약 취소에 실패했습니다. 관리자에게 문의해주세요.";
            alert(errorMessage);
            console.error("예약 취소 실패:", err);
        }
    };

    return(
        <>
        <div className="myresv">
            <div className="resvForm">
                <div className="filter">
                    <select value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)}>
                        <option value="all">전체내역</option>
                        <option value="completed">예약/결제완료</option>
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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.length === 0 && (
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
                                        <Link to={`/user/${resv.popupNo}`}>
                                            <img
                                                src={getPosterUrl(resv.popupNo)}
                                                alt={resv.popupName}
                                            />
                                        </Link>
                                    </div>
                                    <div className="details">
                                        <p className="title">{resv.popupName}</p>
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
                                    <span className={`status ${resv.reservationStatus === '결제완료' ? 'completed' : 
                                                                resv.reservationStatus === '예약완료' ? 'completed' : 'cancelled'}`}>
                                        {resv.reservationStatus}
                                    </span>
                                    {resv.reservationStatus === "결제완료" && (
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