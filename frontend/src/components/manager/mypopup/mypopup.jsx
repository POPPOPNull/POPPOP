import "./mypopup.css";
import { useState, useEffect } from "react";  
import { useNavigate } from "react-router-dom";  
import ManagerSearchBar from "../ManagerSearchBar";
import { getMyPopupList } from "../../../api/ManagerAPI";
import { jwtDecode } from "jwt-decode";



function mapState(p) {

  if (p.approvalStatus === "반려") return "반려";
  if (p.approvalStatus === "대기") return "승인 대기";

  // 여기서부터는 승인된 팝업이라고 가정
  const todayStr = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  if (todayStr < p.startDate) return "오픈 예정";
  if (todayStr > p.endDate) return "종료";

  // 기간 안이면 예약 가능 여부로
  if (p.reservableStatus === 1) return "예약 가능";
  return "예약 불가";
}


function MyPopup() {

  const token = localStorage.getItem("accessToken");
  let managerId = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("decoded token:", decoded); 
      managerId = decoded.id; 
    } catch (err) {
      console.error("토큰 디코딩 오류:", err);
    }
  }
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("latest");
  const navigate = useNavigate();  
  const [list, setList] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  const [page, setPage] = useState(1);
  const pageSize = 10; // 한 페이지당 10개

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);      // 🔹 요청 시작할 때 true (선택)
      setError(null);

      const data = await getMyPopupList();
      console.log("📦 /manager/mypopup response in React:", data);

      const rows = data.map((p) => ({
        id: p.no,
        title: p.name,
        state: mapState(p),
        date: `${p.startDate} ~ ${p.endDate}`,
        location: p.location || p.popupLocation,
        category: p.categoryName,
      }));

      setList(rows);
    } catch (e) {
      console.error("조회 오류:", e);
      setError("내 팝업스토어 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);     
    }
  };

  fetchData();
}, []);

  let filtered = [...list];

  if (q.trim()) {
    const keyword = q.trim().toLowerCase();
    filtered = filtered.filter((row) =>
      row.title.toLowerCase().includes(keyword)
    );
  }

      if (sortKey === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
      if (sortKey === "state") filtered.sort((a, b) => a.state.localeCompare(b.state));

      const totalPages = Math.ceil(filtered.length / pageSize) || 1;
      const startIndex = (page - 1) * pageSize;
      const paginatedRows = filtered.slice(startIndex, startIndex + pageSize);

      const goDashboard = (id) => {
        navigate(`/manager/mypopup/${id}`);
      };

      const goDetail = (id) => {
        navigate(`/manager/mypopup/${id}/detail`);
      };


      if (loading) {
        return (
          <div className="mp-wrap">
            <div>나의 팝업스토어 목록을 불러오는 중...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="mp-wrap">
            <div style={{ color: "red", fontSize: 14 }}>{error}</div>
          </div>
        );
      }

  return (
    <div className="mp-wrap">
      <div className="mp-top">
        <div className="mp-user">
        <span className="badge">
          {managerId || "알 수 없음"}
        </span>
      </div>
      </div>

      
        <ManagerSearchBar
          value={q}
          onChange={setQ}
          placeholder="팝업스토어 검색"
        />

      <div className="mp-card">
        <div className="mp-table">
          <div className="mp-thead">
            <div>팝업 타이틀</div>
            <div>운영 상태</div>
            <div>날짜</div>
            <div>위치</div>
            <div>카테고리</div>
            <div className="center">관리</div>
          </div>

          {paginatedRows.map(row => (
            <div key={row.id} className="mp-tr">
              <div className="ellipsis">{row.title}</div>
              <div>{row.state}</div>
              <div>{row.date}</div>
              <div>{row.location}</div>
              <div>{row.category}</div>
              <div className="center mp-actions">
                <button
                  className="btn-detail"
                  onClick={() => goDetail(row.id)}
                >
                  상세
                </button>
                <button
                  className="mypopup-dashboard-btn"
                  onClick={() => navigate(`/manager/mypopup/${row.id}`)}
                >
                  대시보드
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
            <div style={{ padding: "16px 14px", color: "#888" }}>
              등록된 팝업스토어가 없어요.
            </div>
          )}

          {filtered.length > 0 && (
          <div className="mp-page">
            <button
              className="page-btn"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  className={
                    "page-btn" + (page === pageNum ? " active" : "")
                  }
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              className="page-btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
            다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPopup;