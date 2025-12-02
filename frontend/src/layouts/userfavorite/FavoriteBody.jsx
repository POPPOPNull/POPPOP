import FavoritePopups from "../../componenets/user/userfavorite/FavoritePopups";
import FBStyle from "./FavoriteBody.module.css"





function FavoriteBody (){
    return(
        <>
            <div className={FBStyle.usermainlayout}>
                <div className={FBStyle.main}>
                    <div style={{height:80}}></div>
                    {/* <h1>찜 목록</h1> */}
                    <FavoritePopups/>
                    <div className={FBStyle.blank}></div>

                    
                
                    
                </div>
            </div>
            
        </>
    )
}

export default FavoriteBody;