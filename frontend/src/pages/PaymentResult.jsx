import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPayment } from '../api/ReservationAPI';

function PaymentResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("결제 결과를 확인 중입니다...");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const isSuccess = queryParams.get('success');

        if (isSuccess === 'true') {
            const paymentKey = queryParams.get('paymentKey');
            const orderId = queryParams.get('orderId');
            const amount = Number(queryParams.get('amount'));

            const processPayment = async () => {
                try {
                    await confirmPayment({ paymentKey, orderId, amount });
                    setMessage("예약 및 결제가 성공적으로 완료되었습니다.");
                } catch (error) {
                    const errorMessage = error.message || "알 수 없는 이유로 최종 승인에 실패했습니다.";
                    setMessage(`결제는 성공했으나 최종 승인 처리 중 오류가 발생했습니다: ${errorMessage}`);
                }
            };

            processPayment();

        } else if (isSuccess === 'false') {
            const errorMessage = queryParams.get('message');
            const displayMessage = errorMessage ? decodeURIComponent(errorMessage) : "알 수 없는 이유로 실패했습니다.";
            setMessage(`결제에 실패했습니다: ${displayMessage}`);
        }
    }, [location]);

    const goToMyReservation = () => {
        navigate('/myreservation');
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>결제 결과</h1>
            <p>{message}</p>
            <button onClick={goToMyReservation} style={{ marginTop: '20px', padding: '10px 20px' }}>
                내 예약 확인하기
            </button>
        </div>
    );
}

export default PaymentResult;
