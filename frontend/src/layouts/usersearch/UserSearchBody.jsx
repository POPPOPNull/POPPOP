import "./UserSearchBody.css"
import Blank from "../../componenets/usermain/Blank";
import SearchBar from "../../componenets/usersearch/SearchBar";
import TodayPopup from "../../componenets/usersearch/TodayPopup";
import { useParams } from "react-router-dom";
useParams





function UserSearchBody (){

    const {searchWord} =useParams();

    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <SearchBar/>
                    <Blank/>
                    <TodayPopup/>

                    


                    
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default UserSearchBody;