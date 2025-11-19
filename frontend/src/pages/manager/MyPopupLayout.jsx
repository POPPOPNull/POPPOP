import { Outlet } from "react-router-dom";

function MyPopupLayout() {
  // 라우팅만 담당, 실제 UI는 각 페이지에서
  return <Outlet />;
}

export default MyPopupLayout;
