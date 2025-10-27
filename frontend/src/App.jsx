import "./App.css"
import User from "./pages/user/usermain"
import Manager from "./pages/manager/managermain"
import Admin from "./pages/admin/adminmain"
import { BrowserRouter,Routes,Route} from "react-router-dom"




function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<User/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/manager" element={<Manager/>}/>
        <Route path="/admin" element={<Admin/>}/>


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
