import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/manager";
import Admin from "./pages/admin/adminmain"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Test2 from "./pages/test2"
import UserCRUD from "./pages/UserCRUD"
import MyPopupPage from "./pages/manager/mypopup";
import ReservationPage from "./pages/manager/reservation";
import ManagerHome from "./pages/manager/managerHome";


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/manager/mypopup" element={<MyPopupPage />} />
        <Route path="/manager/reservation" element={<ReservationPage />} />
        <Route path="/manager/managerHome" element={<ManagerHome />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/test2" element={<Test2/>}></Route>
        <Route path="/test3" element={<UserCRUD/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
