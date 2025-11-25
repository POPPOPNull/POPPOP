import "./reservation.css";
import { useEffect, useState } from "react";
import { useParams,NavLink } from "react-router-dom";
import ManagerSearchBar from "../ManagerSearchBar";
import {fetchMyPopupReservations,fetchMyPopupDetail} from "../../../api/ManagerAPI";

//날짜
const getTodayString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const TODAY = getTodayString();

function Reservation() {

  const { popupNo } = useParams();

  const [list, setList] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationData, popupData] = await Promise.all([
          fetchMyPopupReservations(popupNo),
          fetchMyPopupDetail(popupNo),
        ]);

        setList(reservationData || []);
        setPopupInfo(popupData || null);

      } catch (err) {
        console.error("예약 내역 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [popupNo]);
  

  let rows = list.filter((r) => {

    const text = [
      r.memberId,
      r.popupName,
      r.reservationDate,
      r.reservationTime,
    ]
      .join(" ")
      .toLowerCase();

      const passSearch = text.includes(q.toLowerCase());
      const passStatus =
      status === "전체" ? true : r.reservationStatus === status;
    return passSearch && passStatus;
  });

  const todayCount = list
    .filter(
      (r) =>
        r.reservationDate === TODAY &&
        (status === "전체" ? true : r.reservationStatus === status)
    )
    .reduce((sum, r) => sum + (r.reservationPersonnel || 0), 0);
    
    
    return (
    <div className="mypopupdet-wrapper">
      <div className="mypopupdet-header">
        <div className="mypopupdet-total-wrap">
          오늘 예약자 수 <strong>{todayCount}명</strong>
        </div>
        </div>
        
      <div className="mypopupdet-toprow">
        <div className="mypopupdet-top-left">
          <span className="badge">
            {popupInfo ? (popupInfo.managerId || popupInfo.id) : ""}
          </span>

          <span className="mypopupdet-selected">
            팝업 스토어<strong> NO_{popupNo}</strong>
          </span>
        </div>

        <div className="mypopupdet-tabs">
          <NavLink
            to={`/manager/mypopup/${popupNo}/detail`}
            className={({ isActive }) =>
              "mypopupdet-tab-item" + (isActive ? " active" : "")
            }
          >
            상세보기
          </NavLink>

          <NavLink
            end
            to={`/manager/mypopup/${popupNo}`}
            className={({ isActive }) =>
              "mypopupdet-tab-item" + (isActive ? " active" : "")
            }
          >
            대시보드
          </NavLink>

          <NavLink
            to={`/manager/mypopup/${popupNo}/reservations`}
            className={({ isActive }) =>
              "mypopupdet-tab-item" + (isActive ? " active" : "")
            }
          >
            예약 내역
          </NavLink>
        </div>
      </div>

    
      <div className="mypopupdet-search-area">
        <div className="mypopupdet-search-left">
          <select
            className="rv-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="예약확정">예약확정</option>
            <option value="취소">예약취소</option>
          </select>

          <div className="mypopupdet-searchbar-wrap">
            <ManagerSearchBar
              value={q}
              onChange={setQ}
              placeholder="예약 내역 검색"
            />
          </div>
        </div>
      </div>

      <div className="rv-card">
        <div className="rv-thead">
          <div>아이디</div>
          <div>예약 일자</div>
          <div>예약 시간</div>
          <div>예약 인원</div>
          <div>예약 상태</div>
        </div>

        {loading && (
          <div className="rv-tr">
            <div style={{ gridColumn: "1 / 6" }}>불러오는 중입니다...</div>
          </div>
        )}

        {!loading && rows.length === 0 && (
          <div className="rv-tr">
            <div style={{ gridColumn: "1 / 6", color: "#888" }}>
              예약 내역이 없습니다.
            </div>
          </div>
        )}

        {!loading &&
          rows.map((r) => (
            <div key={r.reservationNo} className="rv-tr">
              <div>{r.memberId}</div>
              <div>{r.reservationDate}</div>
              <div>{r.reservationTime}</div>
              <div>{r.reservationPersonnel}</div>
              <div>{r.reservationStatus}</div>
            </div>
                ))}
      </div>
    </div>
  );
}
export default Reservation;