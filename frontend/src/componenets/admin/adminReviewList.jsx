import ListContainer from "./ListContainer";
import { selectAllReviews } from "../../api/adminAPI";
import { useEffect, useContext } from "react";
import { SearchContext } from "./searchProvider";

function AdminReviewList() {

    // 검색 카테고리 목록
    const { setAvailableCategory, setSearchCategory } = useContext(SearchContext);

    const headers = [
        { header: '리뷰 번호', accessor: 'reviewNo' },
        { header: '리뷰 내용', accessor: 'content' },
        { header: '팝업 이름', accessor: 'popupName' },
        { header: '작성자 ID', accessor: 'memberId' }
    ];

    // 컴포넌트 마운트 시 SearchContext 카테고리 목록 설정
    useEffect(() => {
        setAvailableCategory(headers);

        // 컴포넌트 언마운트 시 정리
        return () => {
            setAvailableCategory([]);
            setSearchCategory('전체');
        };
    }, []);

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
            itemKey="no"
        />
    );
}

export default AdminReviewList;