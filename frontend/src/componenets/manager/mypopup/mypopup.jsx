import "./mypopup.css";
import { useState } from "react";

const MOCK = [
  { id: 1, title: "비비고 X 세븐틴", state: "운영 중", date: "25.09.30–10.29", location: "서울시 마포구", category: "식품" },
  { id: 2, title: "퓌", state: "운영 중", date: "25.09.30–11.08", location: "서울시 성동구", category: "뷰티" },
  { id: 3, title: "닥터 X 빠더너스", state: "운영 대기", date: "25.11.10–11.23", location: "서울시 성동구", category: "뷰티" },
  { id: 4, title: "Dr.G X 이영지", state: "운영 종료", date: "25.09.01–09.30", location: "서울시 마포구", category: "뷰티" },
];

function MyPopup() {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("latest");

  let filtered = MOCK.filter(r =>
    [r.title, r.state, r.location, r.category]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  if (sortKey === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sortKey === "state") filtered.sort((a, b) => a.state.localeCompare(b.state));

  return (
    <div className="mp-wrap">
      <div className="mp-top">
        <div className="mp-user">
          <span className="badge">manager01</span>
          <a className="logout" href="#">로그아웃</a>
        </div>

        <div className="mp-controls">
          <select value={sortKey} onChange={e => setSortKey(e.target.value)} className="sel">
            <option value="latest">정렬</option>
            <option value="title">제목</option>
            <option value="state">상태</option>
          </select>

          <input
            className="search"
            placeholder="검색 내용"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button className="btn-search">검색</button>
        </div>
      </div>

      <div className="mp-card">
        <div className="mp-table">
          <div className="mp-thead">
            <div>팝업 타이틀</div>
            <div>운영 상태</div>
            <div>날짜</div>
            <div>위치</div>
            <div>카테고리</div>
            <div className="center">편집</div>
          </div>

          {filtered.map(row => (
            <div key={row.id} className="mp-tr">
              <div className="ellipsis">{row.title}</div>
              <div>{row.state}</div>
              <div>{row.date}</div>
              <div>{row.location}</div>
              <div>{row.category}</div>
              <div className="center">
                <button className="btn-edit" onClick={() => alert(`편집: ${row.title}`)}>편집</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mp-page">1</div>
      </div>
    </div>
  );
}

export default MyPopup;