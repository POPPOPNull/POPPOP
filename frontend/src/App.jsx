// App.jsx
import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/manager";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PopupDetails from "./pages/user/PopupDetails"
import Dashboard from "./pages/manager/dashboard"; 
import MyPopupPage from "./pages/manager/mypopup";
import MypopupdetPage from "./pages/manager/mypopupdet";
import PopupRegister from "./pages/manager/popup-register";
import ReservationPage from "./pages/manager/reservations";
import MyPopupLayout from "./pages/manager/MyPopupLayout";
import MyInformation from "./pages/user/MyInfo"
import MyReview from "./pages/user/MyReviews"
import MyReservation from "./pages/user/MyReservations"
import Maps from "./pages/user/Maps"
import Reservations from "./pages/user/Reservations"
import Login from "./pages/Login"
import AdminLogin from "./pages/AdminLogin.jsx"
import SignUp from "./pages/SignUp"
import ManagerSignUp from "./pages/ManagerSignUp.jsx"

import InsertReview from "./pages/user/InsertReview";

import AdminLayout from "./pages/admin/adminLayout";
import AdminMain from "./layouts/adminmain/admin-main";
import UserSearch from "./pages/user/UserSearch";
import AdminManagerMemberList from "./componenets/admin/AdminManagerMemberList.jsx";
import AdminManagerPopupList from "./componenets/admin/adminManagerPopupList";
import AdminManagerReservationList from "./componenets/admin/adminManagerReservationList";
import AdminManagerReservationDetails from "./componenets/admin/adminManagerReservationDetails";
import UserFavorite from "./pages/user/UserFavorite";
import AdminManagerPopupDetails from "./componenets/admin/adminManagerPopupDetails";
import Test from "./layouts/usermain/Test";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AdminMemberList from "./componenets/admin/adminMemberList.jsx";
import AdminReviewList from "./componenets/admin/adminReviewList.jsx";
import AdminReservationList from "./componenets/admin/adminReservationList.jsx";

import { AuthProvider, useAuth, ProtectedRoute } from "./hooks/UseAuth.jsx";

// 역할에 따라 첫 화면 리다이렉트
const RedirectBasedOnRole = () => {
  const { role, loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;

  if (!role) {
    // 비로그인 상태 → 기본 메인(User) 노출
    return <User />;
  }

  switch (role) {
    case 'ADMIN':
      return <Navigate to="/admin" replace />;
    case 'MANAGER':
      return <Navigate to="/manager" replace />;
    case 'USER':
      return <Navigate to="/user" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>

      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            {/* 첫 진입: 역할에 따라 분기 */}
            <Route index element={<RedirectBasedOnRole />} />

            {/* 유저 공개 라우트 */}
            <Route path="/user">
              <Route index element={<User />} />

              <Route path=":popupNo" element={<PopupDetails />} />
              <Route path=":popupNo/review" element={<InsertReview />} />

              <Route path="search" element={<UserSearch />} />
              <Route path="maps" element={<Maps />} />
            </Route>

            {/* 유저 보호 라우트 (로그인 + USER 권한 필요) */}
            <Route element={<ProtectedRoute requiredRoles={['USER']} />}>
              <Route path="/user/favorite" element={<UserFavorite />} />
              <Route path="/myinfo" element={<MyInformation />} />
              <Route path="/myreview" element={<MyReview />} />
              <Route path="/myreservation" element={<MyReservation />} />
              <Route path="/reservations/:popupNo" element={<Reservations />} />
            </Route>

            {/* 인증 관련 페이지 */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/user/signup" element={<SignUp />} />
            <Route path="/manager/signup" element={<ManagerSignUp />} />

            {/* 매니저 공개 메인 페이지 */}
            <Route path="/manager" element={<Manager />} />

            {/* 매니저 보호 라우트 */}
            <Route element={<ProtectedRoute requiredRoles={['MANAGER']} />}>
              <Route path="/manager/dashboard" element={<Dashboard />} />
              <Route path="/manager/mypopup" element={<MyPopupPage />} />
              {/* 선택된 팝업 전용 레이아웃 */}
              <Route path="/manager/mypopup/:popupNo" element={<MyPopupLayout />}>
                <Route index element={<Dashboard />} />                {/* 기본 탭 */}
                <Route path="detail" element={<MypopupdetPage />} />   {/* 상세 */}
                <Route path="reservations" element={<ReservationPage />} /> {/* 예약 */}
              </Route>
              {/* <Route path="/manager/mypopupdet" element={<MypopupdetPage />} /> */}
              <Route path="/manager/popup-register" element={<PopupRegister />} />
              {/* <Route path="/manager/reservations" element={<ReservationPage />} /> */}
            </Route>

            {/* 관리자 보호 라우트 */}
            <Route element={<ProtectedRoute requiredRoles={['ADMIN']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminMain />} />
                <Route path="members" element={<AdminMemberList />} />
                <Route path="reviews" element={<AdminReviewList />} />
                <Route path="reservation" element={<AdminReservationList />} />
                <Route path="manager-members" element={<AdminManagerMemberList />} />
                <Route path="manager-popup" element={<AdminManagerPopupList />} />
                <Route path="manager-popup/:popupNo" element={<AdminManagerPopupDetails />} />
                <Route path="manager-reservation" element={<AdminManagerReservationList />} />
                <Route path="manager-reservation/:popupNo" element={<AdminManagerReservationDetails />} />
              </Route>
            </Route>

            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
