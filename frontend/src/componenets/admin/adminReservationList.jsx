import ListContainer from "./ListContainer";
import { selectAllReservation } from "../../api/adminAPI";

function AdminReservationList () {
    const headers = ['예약 번호', '예약 상태', '예약 인원', '취소 사유', '팝업 이름', '예약자 ID'];

    const renderReservation = (reservation, layoutClassName) => (
        <div key={reservation.reservationNo} className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{reservation.reservationNo}</div>
            <div className="ellipsis">{reservation.reservationStatus}</div>
            <div className="ellipsis">{reservation.reservationPersonnel}</div>
            <div className="ellipsis">{reservation.cancelReason}</div>
            <div className="ellipsis">{reservation.popupName}</div>
            <div className="ellipsis">{reservation.memberId}</div>
        </div>
    );

    return (
        <ListContainer 
            fetchDataFunction={selectAllReservation}
            renderItem={renderReservation}
            tableHeaders={headers}
            layoutClassName="layout-reservation"
        />
    );
}

export default AdminReservationList;