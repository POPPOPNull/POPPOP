import ListContainer from "./ListContainer";
import { selectAllReservation } from "../../api/adminAPI";
import { useEffect, useContext } from "react";
import { SearchContext } from "./searchProvider";

function AdminReservationList () {

    // 검색 카테고리 목록
    const { setAvailableCategory, setSearchCategory } = useContext(SearchContext);

    const headers = [
        { header: '예약 번호', accessor: 'reservationNo' },
        { header: '팝업 이름', accessor: 'popupName' },
        { header: '예약자 ID', accessor: 'memberId' },
        { header: '예약 인원', accessor: 'reservationPersonnel' },
        { header: '예약 상태', accessor: 'reservationStatus' },
        { header: '취소 사유', accessor: 'cancelReason' },
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

    const renderReservation = (reservation, layoutClassName) => (
        <div key={reservation.reservationNo} className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{reservation.reservationNo}</div>
            <div className="ellipsis">{reservation.popupName}</div>
            <div className="ellipsis">{reservation.memberId}</div>
            <div className="ellipsis">{reservation.reservationPersonnel}</div>
            <div className="ellipsis">{reservation.reservationStatus}</div>
            <div className="ellipsis">{reservation.cancelReason}</div>
        </div>
    );

    return (
        <ListContainer 
            fetchDataFunction={selectAllReservation}
            renderItem={renderReservation}
            tableHeaders={headers}
            layoutClassName="layout-reservation"
            itemKey="no"
        />
    );
}

export default AdminReservationList;