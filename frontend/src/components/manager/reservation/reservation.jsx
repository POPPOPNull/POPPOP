import "./reservation.css";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchMyPopupReservations, fetchMyPopupDetail } from "../../../api/ManagerAPI";

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

  const [page, setPage] = useState(1);       // 현재 페이지
  const itemsPerPage = 8;                   // 페이지당 8개

  const [visitedMap, setVisitedMap] = useState({});

  const toggleVisit = (reservationNo) => {
    setVisitedMap((prev) => ({
      ...prev,
      [reservationNo]: !prev[reservationNo],   // 없으면 true, 있으면 반대로
    }));
  };

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

  // 검색 + 상태 필터
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
    const passStatus = status === "전체" ? true : r.reservationStatus === status;

    return passSearch && passStatus;
  });

  // 검색어 변경 시 page=1로 리셋
  useEffect(() => {
    setPage(1);
  }, [q, status]);

  // 오늘 예약자 수
  const todayCount = list
    .filter(
      (r) =>
        r.reservationDate === TODAY &&
        (status === "전체" ? true : r.reservationStatus === status)
    )
    .reduce((sum, r) => sum + (r.reservationPersonnel || 0), 0);

  // CSV 다운로드 핸들러
  const handleDownloadCSV = () => {
    if (list.length === 0) {
      alert("다운로드할 예약 내역이 없습니다.");
      return;
    }

    // CSV 헤더
    const headers = ["아이디", "예약번호", "예약일자", "예약시간", "인원", "상태"];

    // 데이터 변환
    const csvRows = [
      headers.join(","), // 헤더 행
      ...list.map(r => [
        r.memberId,
        r.reservationNo,
        r.reservationDate,
        r.reservationTime,
        r.reservationPersonnel,
        r.reservationStatus
      ].join(","))
    ];

    // CSV 문자열 생성
    const csvString = csvRows.join("\n");

    // BOM 추가 (한글 깨짐 방지)
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvString], { type: "text/csv;charset=utf-8;" });

    // 다운로드 링크 생성 및 클릭
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `reservation_list_${popupNo}_${TODAY}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 프린트 핸들러
  const handlePrint = () => {
    window.print();
  };


  //페이징(10개씩)
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedRows = rows.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(rows.length / itemsPerPage);


  return (
    <div className="mypopupdet-wrapper">
      <div className="mypopupdet-header">
        <div className="mypopupdet-total-wrap">
          오늘 예약자 수 <strong>{todayCount}명</strong>
        </div>
      </div>

      <div className="mypopupdet-toprow">
        <div className="mypopupdet-top-left">
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
            to={`/manager/mypopup/${popupNo}/edit`}
            className={({ isActive }) =>
              "mypopupdet-tab-item" + (isActive ? " active" : "")
            }
          >
            수정하기
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

      {/* CSV & Print 버튼 그룹 */}
      <div className="export-btn-group">
        <button
          onClick={handleDownloadCSV}
          className="action-btn csv-btn"
        >
          CSV 다운로드
        </button>
        <button
          onClick={handlePrint}
          className="action-btn print-btn"
        >
          프린트 모드
        </button>
      </div>

      <div className="rv-card">
        <div className="rv-thead">
          <div>아이디</div>
          <div>예약번호</div>
          <div>예약 일자</div>
          <div>예약 시간</div>
          <div>예약 인원</div>
          <div>예약 상태</div>
          <div>방문 확인</div>
        </div>

        <div className="rv-tbody">
          {loading && (
            <div className="rv-tr">
              <div style={{ gridColumn: "1 / 8" }}>불러오는 중입니다...</div>
            </div>
          )}

          {!loading && rows.length === 0 && (
            <div className="rv-tr">
              <div style={{ gridColumn: "1 / 8", color: "#888", textAlign: "center", padding: "20px" }}>
                예약 내역이 없습니다.
              </div>
            </div>
          )}

          {/* 목록 */}
          {!loading &&
            paginatedRows.map((r) => (
              <div key={r.reservationNo} className="rv-tr">
                <div>{r.memberId}</div>
                <div>{r.reservationNo}</div>
                <div>{r.reservationDate}</div>
                <div>{r.reservationTime}</div>
                <div>{r.reservationPersonnel}</div>
                <div>{r.reservationStatus}</div>
                <div>
                  <button
                    type="button"
                    className={`visit-btn ${visitedMap[r.reservationNo] ? "active" : ""}`}
                    onClick={() => toggleVisit(r.reservationNo)}
                  >
                    {visitedMap[r.reservationNo] ? "방문취소" : "방문확인"}
                  </button>
                </div>
              </div>
            ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination fixed-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`page-btn ${page === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;