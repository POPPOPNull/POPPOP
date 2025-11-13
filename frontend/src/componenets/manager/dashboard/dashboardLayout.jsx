import DashboardTop from "./dashboardTop";
import DashboardGrid from "./dashboardGrid";
// import "../../../pages/manager/manager-page.css";
import ManagerSearchBar from "../ManagerSearchBar";
import { useState } from "react";
import "./dashboard.css";

function DashboardLayout() {
  const [searchText, setSearchText] = useState("");
  

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", searchText); // 일단 콘솔로 확인 
  };

  return (
    <div className="dashboard-container">
      <div>
      <ManagerSearchBar
        value={searchText}
        onChange={setSearchText}
        placeholder="검색어를 입력하세요"
      />
      </div>

      {/* 상단 카드 */}
      <DashboardTop />

      {/* 중간 네모박스 */}
      <DashboardGrid />
    </div>
  );
}

export default DashboardLayout;