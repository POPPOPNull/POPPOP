import ListContainer from "./ListContainer";
import { selectAllReviews } from "../../api/adminAPI";

function AdminReviewList() {
    const headers = ['리뷰 번호', '리뷰 내용', '팝업 이름', '작성자 ID'];

    const renderReview = (review, layoutClassName) => (
        <div key={review.reviewNo} className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{review.reviewNo}</div>
            <div className="ellipsis">{review.content}</div>
            <div className="ellipsis">{review.popupName}</div>
            <div className="ellipsis">{review.memberId}</div>
        </div>
    );

    return (
        <ListContainer 
            fetchDataFunction={selectAllReviews}
            renderItem={renderReview}
            tableHeaders={headers}
            layoutClassName="layout-reviews"
        />
    );
}

export default AdminReviewList;