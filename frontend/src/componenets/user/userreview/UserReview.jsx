import { useEffect, useState } from "react";
import URStyle from "./UserReview.module.css"
import { useParams } from "react-router-dom";
import { insertReview } from "../../../api/ReviewAPI";

function UserReview(){
    
    const {popupNo}=useParams();

    const [content, setContent] = useState();

    const onChangeContent=(e)=>{
        setContent(e.target.value)
        console.log("핸들러",content)
        
        
    }
    const onClickRegist=()=>{
        insertReview(content,popupNo)
        
    }





    return(
        <>
            <div className={URStyle.layout}>
                <div>리뷰작성</div>
                <textarea
                    className={URStyle.contentbox} 
                    placeholder="리뷰를 작성해주세요"
                    onChange={onChangeContent}
                >
                </textarea>
                <button onClick={onClickRegist}>작성</button>
            </div>
        </>
    )
}

export default UserReview;