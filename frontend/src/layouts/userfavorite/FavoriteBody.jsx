import FavoritePopups from "../../componenets/user/userfavorite/FavoritePopups";
<<<<<<< HEAD
import FBStyle from "./FavoriteBody.module.css"
=======
import "./FavoriteBody.css"
>>>>>>> JWT/master





function FavoriteBody (){
    return(
        <>
<<<<<<< HEAD
            <div className={FBStyle.usermainlayout}>
                <div className={FBStyle.main}>
                    <div className={FBStyle.blank}></div>
                    <h1>찜 목록</h1>
                    <FavoritePopups/>
                    <div className={FBStyle.blank}></div>

                    
                
                    {/* <div className="footer">푸터자리입니다.</div> */}
=======
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <h1>찜 목록</h1>
                    <FavoritePopups/>


                    
                
                    <div className="footer">푸터자리입니다.</div>
>>>>>>> JWT/master
                </div>
            </div>
            
        </>
    )
}

export default FavoriteBody;