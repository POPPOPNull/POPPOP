import React from "react";
import { useEffect,useState } from "react";
import "./Review.css";
import { deleteReviewById, selectReviewById, updateReviewById } from '../../api/ReviewAPI';

function Review(){
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    const [editingReviewNo, setEditingReviewNo] =useState(null);
    const [editContent, setEditContent] =useState("");

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

    const handleEditClick = (review) => {
        setEditingReviewNo(review.reviewNo);
        setEditContent(review.content);
    };

    // 수정 취소
    const handleCancelEdit = () => {
        setEditingReviewNo(null);
        setEditContent("");
    };

    // 저장
    const handleSave = async (reviewNo) => {
        if (!editContent.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        try {
            
            const updated = await updateReviewById(reviewNo, { content: editContent });

            setReviews((prev) =>
                prev.map((r) =>
                    r.reviewNo === reviewNo
                        ? {
                            ...r,
                            content: updated.content,
                            reviewDate: updated.reviewDate,
                        }
                    : r
                )
            );

            alert("리뷰가 수정되었습니다.");
            setEditingReviewNo(null);
            setEditContent("");
        } catch (err) {
            console.error("리뷰 수정 실패:", err);
            alert("리뷰 수정에 실패했습니다.");
        }
    };

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
            {/* <div className="reviewsearch">
                <input className="myreviewsearch" type="text" placeholder="팝업스토어명, 키워드 검색"/>
            </div> */}
            <div style={{ height: "12px" }}></div>

                {reviews.length === 0 ? (
                    <p className="empty-message">작성한 리뷰가 없습니다.</p>
                ) : (
                    reviews.map((review) => {
                        const isEditing = editingReviewNo === review.reviewNo;

                        return(
                        <div key={review.reviewNo} className="myreviews">
                            <div className="userreview">
                                <div className="myreviewpopup">📍 {review.popupName}</div>
                                <div className="myreviewdate">📆 {review.reviewDate}</div>

                                {isEditing ? (
                                    <textarea
                                        className="myreviewcontent-edit"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value.slice(0, 120))}
                                        maxLength={120}
                                    />
                                ) : (
                                    <div className="myreviewcontent">📝 {review.content}</div>
                                )}
                            </div>

                            <div className="myreviewbutton">
                                {isEditing ? (
                                    <>
                                        <button onClick={() => handleSave(review.reviewNo)}>
                                            저장
                                        </button>
                                        <button onClick={handleCancelEdit}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(review)}>수정</button>
                                        <button onClick={() => handleDelete(review.reviewNo)}>
                                            삭제
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        );
                    })
                )}
        </div>
        </>
    );
}

export default Review;