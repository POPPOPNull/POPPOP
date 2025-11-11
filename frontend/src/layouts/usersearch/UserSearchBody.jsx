import "./UserSearchBody.css"
import Blank from "../../componenets/user/usermain/Blank";
import SearchBar from "../../componenets/user/usersearch/SearchBar";
import TodayPopup from "../../componenets/user/usersearch/TodayPopup";
import { useParams } from "react-router-dom";
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
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default UserSearchBody;