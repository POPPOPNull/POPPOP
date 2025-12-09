import { useEffect, useState } from "react";
import URStyle from "./UserReview.module.css"
import { useParams } from "react-router-dom";
import { insertReview } from "../../../api/ReviewAPI";

function UserReview(){
    
    const {popupNo}=useParams();
     

    const [content, setContent] = useState("");
    const [ isAuthorized, setIsAuthorized] = useState(false);

    const onChangeContent=(e)=>{
        setContent(e.target.value)
        console.log("핸들러",content)
    }

     const parseJwt = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch (e) {
      console.error('토큰 파싱 실패', e);
      return null;
    }
  };

  useEffect(() => {
      const savedToken = sessionStorage.getItem('accessToken');
      if (savedToken) {
        const payload = parseJwt(savedToken);
        if (payload) {
          setIsAuthorized(true)
        } else {
          sessionStorage.removeItem('accessToken');
        }
      }
    }, []);
    
    
    const onClickRegist=()=>{
        
            if(!isAuthorized){
                alert("로그인 후 후기를 작성할 수 있습니다.")
                window.location.href="/auth/login"
                return;
            }
        
            if(content==""){
                alert("후기 내용을 작성해주세요")
                return
            }

            insertReview(content,popupNo)
        .then(
            alert('후기가 작성되었습니다.')
        ).catch(
            err=>{
                console.error('리뷰 실패',err)
                alert('후기 등록에 실패하였습니다.')
            }
        
        )
        


        
        window.location.reload()
    }





    return(
        <>
            <div className={URStyle.layout}>
                <div style={{height:20}}></div>
                <textarea
                    className={URStyle.contentbox} 
                    placeholder="리뷰를 작성해주세요"
                    onChange={onChangeContent}
                >
                </textarea>
                <div className={URStyle.registback}>
                    <div className={URStyle.registbtn} onClick={onClickRegist}>작성</div>
                </div>
            </div>
        </>
    )
}

export default UserReview;