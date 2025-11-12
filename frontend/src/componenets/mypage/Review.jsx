import React from "react";
import "./Review.css"

function Review(){
    

    return(
        <>
        <div className="myreviewform">
            <div className="reviewsearch">
                <input className="myreviewsearch" type="text" placeholder="팝업스토어명, 키워드 검색"/>
            </div>

            <div className="myreviews">
            <div className="userreview">
                <div className="myreviewpopup">BEAUTY POPUP</div>
                <div className="myreviewdate">2025-11-03</div>
                <div className="myreviewcontent">직원분이 친절하고 체험도 재밌었어요</div>
            </div>
                <div className="myreviewbutton">
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>

        </div>
        </>
    )
}

export default Review;