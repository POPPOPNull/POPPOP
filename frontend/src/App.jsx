import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/manager";
import { BrowserRouter,Routes,Route} from "react-router-dom"
import PopupDetails from "./pages/user/PopupDetails"
// import KakaoMap from "./componenets/Map"
import MyPopupPage from "./pages/manager/mypopup";
import MypopupdetPage from "./pages/manager/mypopupdet";
import MyPopupRegPage from "./pages/manager/mypopupreg";
import ReservationPage from "./pages/manager/reservation";
import ManagerHome from "./pages/manager/managerHome";
import MyInformation from "./pages/user/MyInfo"
import MyReview from "./pages/user/MyReviews"
import MyReservation from "./pages/user/MyReservations"
import Maps from "./pages/user/Maps"
import Reservations from "./pages/user/Reservations"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

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







function App() {
  

  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user">
          <Route index element={<User/>}/>
          <Route path=":popupNo" element={<PopupDetails/>}/>
          <Route path=":popupNo/review" element={<InsertReview/>}/>
          <Route path="search" element={<UserSearch/>}/>
          <Route path="favorite" element={<UserFavorite/>}></Route>
          

        </Route>

        <Route path="/manager" element={<Manager/>}/>
        <Route path="/manager/mypopup" element={<MyPopupPage />} />
        <Route path="/manager/mypopupdet" element={<MypopupdetPage />} />
        <Route path="/manager/mypopupreg" element={<MyPopupRegPage />} />
        <Route path="/manager/reservation" element={<ReservationPage />} />
        <Route path="/manager/managerHome" element={<ManagerHome />} />
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


         
        <Route path="/myinfo" element={<MyInformation/>}/>
        <Route path="/myreview" element={<MyReview/>}/>
        <Route path="/myreservation" element={<MyReservation/>}/>
        <Route path="/maps" element={<Maps/>}/>
        <Route path="/reservations/:popupNo" element={<Reservations/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        <Route path="/test" element={<Test/>}></Route>
      </Routes>
    </BrowserRouter>
    </DndProvider>
    </>
  )
}

export default App
