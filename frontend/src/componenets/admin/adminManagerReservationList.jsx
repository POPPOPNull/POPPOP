import ListContainer from "./ListContainer";
import { selectReservationSummary } from "../../api/adminAPI";
import { useNavigate } from "react-router-dom";

function AdminManagerReservationList() {

    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (item && item.popupId) {
            navigate(`/admin/reservation/${item.popupId}`);
        } else {
            console.error("팝업 번호를 찾을 수 없습니다.", item);
            alert("팝업 스토어 정보가 올바르지 않아, 페이지 이동을 할 수 없습니다.");
        }
    };

    const headers = ['팝업 이름', '진행 상태', '예약 건 수', '총 예약 인원'];

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
            />
    );
}

export default AdminManagerReservationList;