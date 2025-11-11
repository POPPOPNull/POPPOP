import ListContainer from "./ListContainer";
import { selectReservationSummary } from "../../api/adminAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SearchContext } from "./searchProvider";

function AdminManagerReservationList() {

    // 검색 카테고리 목록 + 상세 페이지 이동 시 검색어 초기화를 위해 setSearchText 추가
    const { setAvailableCategory, setSearchCategory, setSearchText } = useContext(SearchContext);

    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (item && item.popupNo) {

            // 페이지 이동 전 검색 관련 상태 초기화
            setSearchText('');
            setSearchCategory('전체');

            // adminAPI 함수 사용 가능 여부 확인 필요
            navigate(`/admin/manager-reservation/${item.popupNo}`);
        } else {
            console.error("팝업 번호를 찾을 수 없습니다.", item);
            alert("팝업 스토어 정보가 올바르지 않아, 페이지 이동을 할 수 없습니다.");
        }
    };

    const headers = [
        { header: '팝업 이름', accessor: 'popupName' },
        { header: '진행 상태', accessor: 'status' },
        { header: '예약 건 수', accessor: 'reservationCount' },
        { header: '총 예약 인원', accessor: 'totalPersonnel' }
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

    const renderSummary = (summary, layoutClassName) => (
        <div className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{summary.popupName}</div>
            <div className="ellipsis">{summary.status}</div>
            <div className="ellipsis">{summary.reservationCount} 건</div>
            <div className="ellipsis">{summary.totalPersonnel} 명</div>
        </div>
    );

    return(
            <ListContainer 
                fetchDataFunction={selectReservationSummary}    // API 호출
                renderItem={renderSummary}               // 행 렌더링 방식
                tableHeaders={headers}                  // 테이블 헤더
                layoutClassName="layout-manager-reservation"
                onItemClick={handleItemClick}
                itemKey="popupNo"
            />
    );
}

export default AdminManagerReservationList;