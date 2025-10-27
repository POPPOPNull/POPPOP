import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/managermain"
import Admin from "./pages/admin/adminmain"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Mypage from "./pages/user/mypage"



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/mypage" element={<Mypage/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
