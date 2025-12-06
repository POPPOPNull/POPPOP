import React, { useEffect, useState } from "react";
import "./mypopupdet.css";
import { NavLink, useParams } from "react-router-dom";
import { fetchMyPopupDetail, fetchMyPopupReservations } from "../../../api/ManagerAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const getTodayString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const TODAY = getTodayString();

function MyPopupDet() {
  const { popupNo } = useParams();

  const [popupInfo, setPopupInfo] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 달력 선택 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!popupNo) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        const [detailData, reservationsData] = await Promise.all([
          fetchMyPopupDetail(popupNo),
          fetchMyPopupReservations(popupNo),
        ]);

        const all = Array.isArray(reservationsData) ? reservationsData : reservationsData || [];

        // 전체 예약자 수
        const totalCount = all.reduce((sum, r) => sum + (r.reservationPersonnel || 0), 0);
        // 오늘 예약자 수
        const todayCount = all
          .filter((r) => r.reservationDate === TODAY)
          .reduce((sum, r) => sum + (r.reservationPersonnel || 0), 0);

        setPopupInfo({
          managerId: detailData.id,
          brandName: detailData.brandName,
          popupName: detailData.name,
          status: detailData.approvalStatus,
          period: `${detailData.startDate}–${detailData.endDate}`,
          categoryName: detailData.categoryName,
          totalCount: totalCount,
          todayCount: todayCount,
        });

        setReservations(all);

      } catch (error) {
        console.error("팝업 상세/예약 조회 실패:", error);
        setPopupInfo(null);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [popupNo]);

  // 예약이 있는 날짜들 (달력 하이라이트용)
  const reservedDates = reservations.map(r => new Date(r.reservationDate));

  // 선택된 날짜의 예약 정보 계산
  const getDailyStats = () => {
    if (!selectedDate) return { count: 0, personnel: 0 };

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dailyReservations = reservations.filter(r => r.reservationDate === dateStr);
    const personnel = dailyReservations.reduce((sum, r) => sum + (r.reservationPersonnel || 0), 0);

    return {
      dateStr,
      count: dailyReservations.length,
      personnel
    };
  };

  const dailyStats = getDailyStats();

  return (
    <div className="mypopupdet-wrapper">
      <div className="mypopupdet-header">
        <div className="mypopupdet-total-wrap">
          전체 예약자 수 <strong>{popupInfo ? popupInfo.totalCount : 0}명</strong>
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
              <div className="mypopupdet-info-label">브랜드 이름</div>
              <div className="mypopupdet-info-value">{popupInfo.brandName}</div>
            </div>
            <div className="mypopupdet-info-row">
              <div className="mypopupdet-info-label">팝업 이름</div>
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
          
          </div>
        </section>
      )}

      {/* 하단: 달력 + 일별 정보 (Split Layout) */}
      <section className="calendar-split-container">
        {/* 왼쪽: 달력 */}
        <div className="calendar-left-panel">
          <DatePicker
            inline
            locale={ko}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dayClassName={(date) => {
              const dateStr = date.toISOString().split('T')[0];
              const hasReservation = reservations.some(r => r.reservationDate === dateStr);
              return hasReservation ? "has-reservation-day" : undefined;
            }}
          />
        </div>

        {/* 오른쪽: 선택된 날짜 정보 */}
        <div className="daily-info-panel">
          <h3 className="daily-info-title">
            📅 {selectedDate ? selectedDate.toLocaleDateString() : "날짜 선택"} 현황
          </h3>

          <div className="daily-stat-box">
            <div className="stat-label">예약 건수</div>
            <div className="stat-value">{dailyStats.count}건</div>
          </div>

          <div className="daily-stat-box">
            <div className="stat-label">방문 예정 인원</div>
            <div className="stat-value">{dailyStats.personnel}명</div>
          </div>

          <div className="daily-info-desc">
            <p>해당 날짜의 상세 예약 내역은 <strong>'예약 내역'</strong> 탭에서 확인하세요.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyPopupDet;
