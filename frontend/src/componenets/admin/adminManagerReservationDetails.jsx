import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListContainer from './ListContainer';
import AdminModal from './adminModal';
import Reservation from '../manager/reservation/reservation';

// 해당 팝업 ID의 모든 예약 내역을 가져오는 함수
const getReservationsForPopup = async (popupId) => {

    console.log(`API 호출 : ${popupId}의 예약 목록을 가져옵니다.`);

    // 임시 데이터(백엔드 구현 시 교체)
    return [
        { }
    ];
};

// 해당 예약 내역을 취소하는 함수
const cancelReservation = async (reservationId) => {

    console.log(`API 호출 : ${reservationId} 예약을 취소합니다.`);
    return { sucess: true };
};

