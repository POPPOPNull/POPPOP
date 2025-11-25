import "./UserSearchBody.css"
import Blank from "../../componenets/user/usermain/Blank";
import SearchBar from "../../componenets/user/usersearch/SearchBar";
import TodayPopup from "../../componenets/user/usersearch/TodayPopup";
import { useParams } from "react-router-dom";
import Footer from "../usermain/Footer";
useParams





function UserSearchBody (){


    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <SearchBar/>
                    <Blank/>

                    <br />        
                    
                    <Footer/>
                </div>
            </div>
            
        </>
    )
}

export default UserSearchBody;