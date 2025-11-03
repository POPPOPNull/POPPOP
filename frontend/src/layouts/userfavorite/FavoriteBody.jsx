import FavoritePopups from "../../componenets/userfavorite/FavoritePopups";
import "./FavoriteBody.css"





function FavoriteBody (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <h1>찜 목록</h1>
                    <FavoritePopups/>


                    
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default FavoriteBody;