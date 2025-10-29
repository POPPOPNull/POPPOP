import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/managermain"
import Admin from "./pages/admin/adminmain"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import PopupDetails from "./pages/user/PopupDetails"
import KakaoMap from "./componenets/Maps"




function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user">
          <Route index element={<User/>}></Route>
          <Route path=":popupNo" element={<PopupDetails/>}/>
        </Route>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/test" element={<KakaoMap/>}/>
        



      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
