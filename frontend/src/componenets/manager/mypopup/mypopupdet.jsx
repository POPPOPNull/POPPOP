import React, { useEffect, useState } from "react";
import "./mypopupdet.css";
import ManagerSearchBar from "../ManagerSearchBar";
import { NavLink, useParams } from "react-router-dom";
import { fetchMyPopupDetail, fetchPopupRecentReservations } from "../../../api/ManagerAPI";




function MyPopupDet() {

  const [popupInfo, setPopupInfo] = useState(null);

  // 예약자 리스트 (최근 5명)
  const [reservations, setReservations] = useState([]);

  const [keyword, setKeyword] = useState("");   
  const [loading, setLoading] = useState(false);

  const { popupNo } = useParams();

      useEffect(() => {
  if (!popupNo) return;

  // 1) 팝업 기본 정보
  const loadPopupDetail = async () => {
    try {
      const data = await fetchMyPopupDetail(popupNo);

      setPopupInfo({
        managerId: data.id,
        popupName: data.name,
        status: data.approvalStatus,
        period: `${data.startDate}–${data.endDate}`,
        categoryName: data.categoryName,
        totalCount: 0,     // 아래에서 실제 값으로 덮어씀
        todayCount: 0,
        closedDays: "-",
      });
    } catch (error) {
      console.error("팝업 상세 조회 실패:", error);
      alert("팝업 상세 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 2) 최근 예약자 5명
  const loadRecentReservations = async () => {
    try {
      setLoading(true);
      const data = await fetchPopupRecentReservations(popupNo, 5);
      // data: { totalCount, reservations: [...] }

      setReservations(data.reservations || []);

      // 전체 예약자 수 반영
      setPopupInfo((prev) =>
        prev ? { ...prev, totalCount: data.totalCount ?? prev.totalCount } : prev
      );
    } catch (error) {
      console.error("최근 예약자 조회 실패:", error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  loadPopupDetail();
  loadRecentReservations();
}, [popupNo]);

const filteredReservations = reservations.filter((r) => {
  if (!keyword) return true;
  const lower = keyword.toLowerCase();
  return (
    r.id.toLowerCase().includes(lower) ||
    r.name.toLowerCase().includes(lower) ||
    r.phone.includes(keyword)
  );
});

  return (
    <div className="mypopupdet-wrapper">
    
      <div className="mypopupdet-header">

      <div className="mypopupdet-total-wrap">
        전체 예약자 수 <strong>{popupInfo ? popupInfo.totalCount : 0}명</strong>
      </div>
      </div>

      <div className="mypopupdet-toprow">
        <div className="mypopupdet-top-left">
          <span className="badge">{popupInfo ? popupInfo.managerId : ""}</span>
          <span className="mypopupdet-selected">
            팝업 스토어<strong>NO_{popupNo}</strong>
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

      <div className="mypopupdet-search-area">
        <ManagerSearchBar
        value={keyword}
        onChange={(value) => setKeyword(value)}
        placeholder="예약 내역 검색"
      />
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
            <div className="mypopupdet-info-label">카테고리</div>
            <div className="mypopupdet-info-value">{popupInfo.categoryName}</div>
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
        {loading ? (
          <div
            style={{
              width: "100%",
              padding: "40px 0",
              textAlign: "center",
              color: "#777",
            }}
          >
            예약 내역을 불러오는 중입니다...
          </div>
        ) : filteredReservations.length === 0 ? (
          <div
            style={{
              width: "100%",
              padding: "40px 0",
              textAlign: "center",
              color: "#777",
            }}
          >
            최근 예약 내역이 없습니다.
          </div>
        ) : (
          <>
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
                {filteredReservations.map((r, idx) => (
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
          </>
        )}
      </section>
    </div>
  );
}

export default MyPopupDet;
