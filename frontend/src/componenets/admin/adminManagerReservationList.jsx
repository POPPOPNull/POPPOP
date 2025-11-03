import ListContainer from "./ListContainer";
import { selectReservationSummary } from "../../api/adminAPI";

function AdminManagerReservationList() {

    const headers = ['팝업 이름', '진행 상태', '예약 건 수', '총 예약 인원'];

    const renderSummary = (summary, layoutClassName) => (
        <div key={summary.popupName} className={`list-row ${layoutClassName}`}>
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
        />
    );
}

export default AdminManagerReservationList;