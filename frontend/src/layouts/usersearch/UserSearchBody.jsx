import "./UserSearchBody.css"
import Blank from "../../components/user/usermain/Blank";
import SearchBar from "../../components/user/usersearch/SearchBar";
import { useParams } from "react-router-dom";
import Footer from "../usermain/Footer";
useParams





function UserSearchBody (){


    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div style={{height:80}}></div>
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