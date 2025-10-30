import "./reservation.css";
import { useState } from "react";

const TODAY = "25.10.22";

const list = [
  { id: 1, userId: "user1", phone: "010-0000-0000", date: "25.10.22", time: "11:00", count: 3, status: "예약확정" },
  { id: 2, userId: "user2", phone: "010-0000-0000", date: "25.10.22", time: "11:00", count: 1, status: "예약확정" },
  { id: 3, userId: "user3", phone: "010-0000-0000", date: "25.10.22", time: "11:00", count: 5, status: "예약확정" },
  { id: 4, userId: "user4", phone: "010-0000-0000", date: "25.10.22", time: "11:30", count: 2, status: "예약확정" },
  { id: 5, userId: "user5", phone: "010-0000-0000", date: "25.10.22", time: "11:30", count: 1, status: "예약확정" },
  { id: 6, userId: "user6", phone: "010-0000-0000", date: "25.10.22", time: "11:30", count: 1, status: "예약확정" },
  { id: 7, userId: "user7", phone: "010-0000-0000", date: "25.10.22", time: "11:30", count: 3, status: "예약확정" },
  { id: 8, userId: "user8", phone: "010-0000-0000", date: "25.10.22", time: "11:30", count: 2, status: "예약확정" },
];

function Reservation() {

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("전체"); 

  let rows = list.filter((r) => {

    const text = [r.userId, r.phone, r.date, r.time].join(" ").toLowerCase();
    const passSearch = text.includes(q.toLowerCase());
    const passStatus = status === "전체" ? true : r.status === status;

    return passSearch && passStatus;
  });

  const todayCount = list
    .filter((r) => r.date === TODAY && (status === "전체" ? true : r.status === status))  // 오늘 날짜만 필터
    .reduce((sum, r) => sum + (r.count || 0), 0);  // count 합계

  return (
    <div className="rv-wrap">
      {/* 상단 바 */}
      <div className="rv-top">
        <h2 className="rv-title">예약내역</h2>

        <div className="rv-controls">
          <select className="rv-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="전체">예약상태</option>
            <option value="예약확정">예약확정</option>
            <option value="취소">예약취소</option>
          </select>

          <input
            className="rv-search"
            placeholder="검색 내용"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="rv-btn">검색</button>
        </div>

        <div className="rv-today">
          오늘 예약자 수 <strong>{todayCount}명</strong>
        </div>
      </div>

      {/* 목록 제목 */}
      <div className="rv-card">
        <div className="rv-thead">
          <div>아이디</div>
          <div>연락처</div>
          <div>예약 일자</div>
          <div>예약 시간</div>
          <div>예약 인원</div>
        </div>

        {rows.map((r) => (
          <div key={r.id} className="rv-tr">
            <div>{r.userId}</div>
            <div>{r.phone}</div>
            <div>{r.date}</div>
            <div>{r.time}</div>
            <div>{r.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservation;