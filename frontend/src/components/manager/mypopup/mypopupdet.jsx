import React, { useEffect, useState } from "react";
import "./mypopupdet.css";
import { NavLink, useParams } from "react-router-dom";
import { fetchMyPopupDetail,fetchMyPopupReservations,  } from "../../../api/ManagerAPI";

const getTodayString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const TODAY = getTodayString();


function MyPopupDet() {

  const [popupInfo, setPopupInfo] = useState(null);

  // 예약자 리스트 (최근 5명)
  const [reservations, setReservations] = useState([]);

  const [keyword, setKeyword] = useState("");   
  const [loading, setLoading] = useState(false);

  const { popupNo } = useParams();

  useEffect(() => {
    if (!popupNo) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // 상세 정보 + 예약 전체 목록 같이 가져오기
        const [detailData, reservationsData] = await Promise.all([
          fetchMyPopupDetail(popupNo),
          fetchMyPopupReservations(popupNo),
        ]);

        const all = Array.isArray(reservationsData)
          ? reservationsData
          : reservationsData || [];

        // 전체 예약자 수 (인원 합)
        const totalCount = all.reduce(
          (sum, r) => sum + (r.reservationPersonnel || 0),
          0
        );

        // 오늘 예약자 수 (인원 합)
        const todayCount = all
          .filter((r) => r.reservationDate === TODAY)
          .reduce(
            (sum, r) => sum + (r.reservationPersonnel || 0),
            0
          );

        setPopupInfo({
          managerId: detailData.id,
          popupName: detailData.name,
          status: detailData.approvalStatus,
          period: `${detailData.startDate}–${detailData.endDate}`,
          categoryName: detailData.categoryName,
          totalCount: totalCount,   // 전체 예약자 수
          todayCount: todayCount,   // 오늘 예약자 수
          closedDays: detailData.closedDays || "-",
        });

        setReservations(all);

      
      } catch (error) {
        console.error("팝업 상세/예약 조회 실패:", error);
        alert("팝업 상세 정보를 불러오는 중 오류가 발생했습니다.");
        setPopupInfo(null);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [popupNo]);

  const filteredReservations = reservations.filter((r) => {
    if (!keyword) return true;
    const lower = keyword.toLowerCase();
    const text = [
      r.memberId,
      r.popupName,
      r.reservationDate,
      r.reservationTime,
      r.phone,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return text.includes(lower);
  });

  const recent5 = [...filteredReservations]
  .sort((a, b) => {
    const aKey = `${a.reservationDate} ${a.reservationTime}`;
    const bKey = `${b.reservationDate} ${b.reservationTime}`;
    return new Date(bKey) - new Date(aKey);
  })
  .slice(0, 5);

  return (
    <div className="mypopupdet-wrapper">
    
      <div className="mypopupdet-header">

      <div className="mypopupdet-total-wrap">
        전체 예약자 수 <strong>{popupInfo ? popupInfo.totalCount : 0}명</strong>
      </div>
      </div>

      <div className="mypopupdet-toprow">
        <div className="mypopupdet-top-left">
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
      ) : recent5.length === 0 ? (
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
        <section className="mypopupdet-table-section">
        <div className="rv-card">
          <div className="rv-thead">
            <div>아이디</div>
            <div>예약번호</div>
            <div>예약 일자</div>
            <div>예약 시간</div>
            <div>예약 인원</div>
            <div>예약 상태</div>
          </div>

          {recent5.map((r) => (
            <div key={r.reservationNo} className="rv-tr">
              <div>{r.memberId}</div>
              <div>{r.reservationNo}</div>
              <div>{r.reservationDate}</div>
              <div>{r.reservationTime}</div>
              <div>{r.reservationPersonnel}</div>
              <div>{r.reservationStatus}</div>
            </div>
          ))}
        </div>
        </section>
      )}
    </div>
    
  );
}

export default MyPopupDet;
