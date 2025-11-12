import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/manager";
import { BrowserRouter,Routes,Route} from "react-router-dom"
import PopupDetails from "./pages/user/PopupDetails"
// import KakaoMap from "./componenets/Map"
import Dashboard from "./pages/manager/dashboard"; 
import MyPopupPage from "./pages/manager/mypopup";
import MypopupdetPage from "./pages/manager/mypopupdet";
import PopupRegister from "./pages/manager/popup-register";
import ReservationPage from "./pages/manager/reservations";
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
import AdminMembers from "./layouts/adminmain/admin-members";
import AdminReview from "./layouts/adminmain/admin-review";
import UserSearch from "./pages/user/UserSearch";
import AdminReservation from "./layouts/adminmain/admin-reservation";
import AdminManagerMain from "./layouts/adminmain/admin-manager-main";
import AdminManagerMemberList from "./componenets/admin/adminManagerMemberList";
import AdminManagerPopupList from "./componenets/admin/adminManagerPopupList";
import AdminManagerReservationList from "./componenets/admin/adminManagerReservationList";
import AdminManagerReservationDetails from "./componenets/admin/adminManagerReservationDetails";
import UserFavorite from "./pages/user/UserFavorite";
import AdminManagerPopupDetails from "./componenets/admin/adminManagerPopupDetails";
import Test from "./layouts/usermain/Test";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProtectedRoute from './routes/ProtectedRoutes';
import { useAuth } from './hooks/UseAuth.jsx';
import { AuthProvider } from "./context/AuthContext";

const RedirectBasedOnRole = () => {
    const { role, loading } = useAuth();
    
    // 로딩 중이거나 아직 인증되지 않았다면 기본 컴포넌트(Main) 표시
    if (loading) return <div>로딩 중...</div>; 
    
    if (!role) {
        // Main 컴포넌트를 비로그인 상태의 랜딩 페이지로 사용
        return <User />;
    }

    // 로그인 후 역할에 따라 해당 메인 페이지로 리디렉션
    switch (role) {
        case 'ADMIN': return <Navigate to="/admin" replace />;
        case 'MANAGER': return <Navigate to="/manager" replace />;
        case 'USER': return <Navigate to="/user" replace />;
        default: return <Navigate to="/auth/login" replace />;
    }
};

function App() {
  

  return (
    <>
    <AuthProvider>
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route index element={<RedirectBasedOnRole/>}/>
        <Route path="/user">
          <Route path=":popupNo" element={<PopupDetails/>}/>
          <Route path=":popupNo/review" element={<InsertReview/>}/>
          <Route path="search" element={<UserSearch/>}/>
          <Route path="maps" element={<Maps/>}/>
        </Route>

        <Route element={<ProtectedRoute requiredRoles={['USER']} />}>
          <Route path="favorite" element={<UserFavorite/>}/>
          <Route path="/myinfo" element={<MyInformation/>}/>
          <Route path="/myreview" element={<MyReview/>}/>
          <Route path="/myreservation" element={<MyReservation/>}/>
          <Route path="/reservations/:popupNo" element={<Reservations/>}/>
        </Route>  
        
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/user/signup" element={<SignUp/>}/>
          <Route path="/manager/signup" element={<ManagerSignUp/>}/>


          <Route path="/manager" element={<Manager/>}/>

        <Route element={<ProtectedRoute requiredRoles={['MANAGER']} />}>
          <Route path="/manager/dashboard" element={<Dashboard />} />
          <Route path="/manager/mypopup" element={<MyPopupPage />} />
          <Route path="/manager/mypopupdet" element={<MypopupdetPage />} />
          <Route path="/manager/popup-register" element={<PopupRegister />} />
          <Route path="/manager/reservations" element={<ReservationPage />} />
        </Route>

        <Route element={<ProtectedRoute requiredRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminMain/>} />
            <Route path="members" element={<AdminMembers/>} />
            <Route path="reviews" element={<AdminReview/>} />
            <Route path="reservation" element={<AdminReservation/>} />
            <Route path="manager-main" element={<AdminManagerMain/>} />
            <Route path="manager-members" element={<AdminManagerMemberList/>} />
            <Route path="manager-popup" element={<AdminManagerPopupList/>} />
            <Route path="manager-popup/:popupNo" element={<AdminManagerPopupDetails/>} />
            <Route path="manager-reservation" element={<AdminManagerReservationList/>} />
            <Route path="manager-reservation/:popupNo" element={<AdminManagerReservationDetails/>} />
          </Route>
        </Route>

        <Route path="/test" element={<Test/>}></Route>
      </Routes>
    </BrowserRouter>
    </DndProvider>
    </AuthProvider>
    </>
  )
}

export default App
