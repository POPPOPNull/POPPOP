import React from "react";
import { useEffect,useState } from "react";
import "./Review.css";
import { deleteReviewById, selectReviewById } from '../../api/ReviewAPI';

function Review(){
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        selectReviewById()
            .then(data => {
                 console.log("내 리뷰 :", data);
                setReviews(data || []);
            })
            .catch(() => 
                setError("리뷰를 불러오는 데 실패했습니다.")
            );
    }, []);

    const handleDelete = async(reviewNo) => {

        const confirmDelete = window.confirm("리뷰를 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deleteReviewById(reviewNo);
            setReviews((prev) => prev.filter((r) => r.reviewNo !== reviewNo));
            alert("리뷰가 삭제되었습니다.");
        } catch (err) {
            console.error("리뷰 삭제 실패:", err);
            alert("리뷰 삭제에 실패했습니다.");
        }
    };

    return(
        <>
        <div className="myreviewform">
            <div className="reviewsearch">
                <input className="myreviewsearch" type="text" placeholder="팝업스토어명, 키워드 검색"/>
            </div>
                {reviews.length === 0 ? (
                    <p className="noreview">작성한 리뷰가 없습니다.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.reviewNo} className="myreviews">
                            <div className="userreview">
                                <div className="myreviewpopup">{review.popupName}</div>
                                <div className="myreviewdate">{review.reviewDate}</div>
                                <div className="myreviewcontent">{review.content}</div>
                            </div>
                            <div className="myreviewbutton">
                                <button>수정</button>
                                <button onClick={() => handleDelete(review.reviewNo)}>삭제</button>
                            </div>
                        </div>
                    ))
                )}
        </div>
        </>
    )
}

export default Review;