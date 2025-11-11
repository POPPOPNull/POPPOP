import FavoritePopups from "../../componenets/user/userfavorite/FavoritePopups";
import FBStyle from "./FavoriteBody.module.css"





function FavoriteBody (){
    return(
        <>
            <div className={FBStyle.usermainlayout}>
                <div className={FBStyle.main}>
                    <div className={FBStyle.blank}></div>
                    <h1>찜 목록</h1>
                    <FavoritePopups/>
                    <div className={FBStyle.blank}></div>

                    
                
                    {/* <div className="footer">푸터자리입니다.</div> */}
                </div>
            </div>
            
        </>
    )
}

export default FavoriteBody;