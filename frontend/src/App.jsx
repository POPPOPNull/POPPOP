import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/manager";
import Admin from "./pages/admin/adminmain"
import AdminMembers from "./pages/admin/adminMembers"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import PopupDetails from "./pages/user/PopupDetails"
import KakaoMap from "./componenets/Map"
import MyPopupPage from "./pages/manager/mypopup";
import MypopupdetPage from "./pages/manager/mypopupdet";
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

import AdminMembersPage from "./pages/admin/adminMembers";
import UserSearch from "./pages/user/UserSearch";





function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user">
          <Route index element={<User/>}/>
          <Route path=":popupNo" element={<PopupDetails/>}/>
          <Route path=":popupNo/review" element={<InsertReview/>}/>
          <Route path="search" element={<UserSearch/>}/>

        </Route>

        <Route path="/manager" element={<Manager/>}/>
        <Route path="/manager/mypopup" element={<MyPopupPage />} />
        <Route path="/manager/mypopupdet" element={<MypopupdetPage />} />
        <Route path="/manager/reservation" element={<ReservationPage />} />
        <Route path="/manager/managerHome" element={<ManagerHome />} />
        <Route path="/admin" element={<Admin/>}/>

          <Route path="/admin/members" element={<AdminMembersPage/>}/>

        <Route path="/myinfo" element={<MyInformation/>}/>
        <Route path="/myreview" element={<MyReview/>}/>
        <Route path="/myreservation" element={<MyReservation/>}/>
        <Route path="/maps" element={<Maps/>}/>
        <Route path="/reservations" element={<Reservations/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>



      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
