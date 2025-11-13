import React, { useEffect, useState } from "react";
import "./mypopupdet.css";
import ManagerSearchBar from "../ManagerSearchBar";

function MyPopupDet() {

  const [popupInfo, setPopupInfo] = useState(null);

  // 예약자 리스트
  const [reservations, setReservations] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {

    setPopupInfo({
        managerId: "manager1",
        popupName: "퓌(FWEE)",
        status: "운영 중",
        period: "25.09.30–25.11.08",
        totalCount: 3500,
        todayCount: 123,
        closedDays: "10월 3일–6일",
    });

    // 예약자 목록 (테이블)
    setReservations([
      { id: "user1", name: "이경철", phone: "010-0000-0000", birth: "000000", date: "25.10.17" },
      { id: "user1", name: "장동건", phone: "010-0000-0000", birth: "000000", date: "25.10.17" },
      { id: "user1", name: "박채린", phone: "010-0000-0000", birth: "000000", date: "25.10.17" },
      { id: "user1", name: "조은선", phone: "010-0000-0000", birth: "000000", date: "25.10.17" },
      { id: "user1", name: "이건우", phone: "010-0000-0000", birth: "000000", date: "25.10.17" },
    ]);
  }, []);


  return (
    <div className="mypopupdet-wrapper">
    
      <div className="mypopupdet-header">
    
      <div className="mypopupdet-search-area">
        <ManagerSearchBar
          value={keyword}
          onChange={setKeyword}
          placeholder="예약 내역 검색"
        />
      </div>

      <div className="mypopupdet-total-wrap">
        전체 예약자 수 <strong>{popupInfo ? popupInfo.totalCount : 0}명</strong>
      </div>
      </div>

    
      {popupInfo && (
        <section className="mypopupdet-info-card">
          <div className="mypopupdet-info-grid">

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">아이디</div>
              <div className="mypopupdet-info-value">{popupInfo.managerId}</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">이름</div>
              <div className="mypopupdet-info-value">{popupInfo.popupName}</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">팝업 운영 상태</div>
              <div className="mypopupdet-info-value">{popupInfo.status}</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">팝업 운영 기간</div>
              <div className="mypopupdet-info-value">{popupInfo.period}</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">현재까지 총 예약자 수</div>
              <div className="mypopupdet-info-value">{popupInfo.totalCount}명</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">오늘 예약자 수</div>
              <div className="mypopupdet-info-value">{popupInfo.todayCount}명</div>
            </div>

            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">기타</div>
              <div className="mypopupdet-info-value">
                휴무일 : {popupInfo.closedDays}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 예약자 목록 */}
      <section className="mypopupdet-table-section">
        <table className="mypopupdet-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>연락처</th>
              <th>생년월일</th>
              <th>예약일자</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((r, idx) => (
              <tr key={idx}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.birth}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mypopupdet-pagination">
          <button className="mypopupdet-page-btn">1</button>
          <button className="mypopupdet-page-btn">2</button>
          <button className="mypopupdet-page-btn">3</button>
          <button className="mypopupdet-page-btn">4</button>
          <span className="mypopupdet-page-ellipsis">...</span>
        </div>
      </section>
    </div>
  );
}

export default MyPopupDet;
