import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListContainer from './ListContainer';
import AdminModal from './adminModal';
import { selectReservationDetailsByPopup, deleteReservation } from '../../api/adminAPI';

function AdminManagerReservationDetails() {
    const { popupNo } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectReservation, setSelectReservation] = useState(null);

    // ListContainer에 전달할 데이터 로딩 함수
    const fetchReservation = () => {
        return selectReservationDetailsByPopup(popupNo);
    };

    // 예약 목록의 한 행을 클릭 했을 때 모달창 열기
    const handleItemClick = (reservation) => {
        setSelectReservation(reservation);
        setIsModalOpen(true);
    };

    // 모달창 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectReservation(null);
    };

    // 예약 취소 처리 함수
    const handleDeleteReservation = async () => {
        if (!selectReservation || !selectReservation.reservationNo) {
            alert("예약 정보가 올바르지 않습니다.");
            return;
        }
        try {
            await deleteReservation(selectReservation.reservationNo);
            alert("예약이 성공적으로 취소되었습니다.")
            handleCloseModal();
            window.location.reload();
        } catch (error) {
            console.error("예약 취소 실패 : ", error);
            alert("예약 취소 중 오류가 발생했습니다.");
        }
    };

    const headers = ['예약자명', '연락처', '예약일', '예약 시간', '인원', '상태'];

    // 상세 예약 리스트 행 렌더링 함수
    const renderReservationDetail = (reservation, layoutClassName) => (
        <div className={`list-row ${layoutClassName}`}>
            <div>{reservation.name}</div>
            <div>{reservation.phone}</div>
            <div>{reservation.reservationDate}</div>
            <div>{reservation.reservationTime}</div>
            <div>{reservation.reservationPersonnel}</div>
            <div>{reservation.reservationStatus}</div>
        </div>
    );

    return (
        <>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
            <h1>팝업 스토어 예약 상세 (팝업번호: {popupNo})</h1>
            <ListContainer
                fetchDataFunction={fetchReservation}
                renderItem={renderReservationDetail}
                tableHeaders={headers}
                layoutClassName="layout-reservation-details"
                onItemClick={handleItemClick}
            />
            <AdminModal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectReservation ? (
                    <div>
                        <h2>예약 정보 확인</h2>
                        <ul>
                            <li>예약 번호 : {selectReservation.reservationNo}</li>
                            <li>예약자 : {selectReservation.name}</li>
                            <li>연락처 : {selectReservation.phone}</li>
                            <li>예약일 : {selectReservation.reservationDate}</li>
                            <li>예약 시간 : {selectReservation.reservationTime}</li>
                            <li>인원 : {selectReservation.reservationPersonnel}</li>
                            <li>상태 : {selectReservation.reservationStatus}</li>
                        </ul>
                        <p style={{color: 'red', fontWeight: 'bold'}}>이 예약을 취소하시겠습니까?</p>
                        <button onClick={handleDeleteReservation}>예약 취소</button>
                    </div>
                ) : (
                    <p>예약 정보를 불러오는 중...</p>
                )}
            </AdminModal>
        </>
    );
}

export default AdminManagerReservationDetails;