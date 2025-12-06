import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";
import JwtAPI from '../../api/JwtAPI';
import { loadTossPayments } from '@tosspayments/payment-sdk';

function Calendar() {
  const navigate = useNavigate();
  const { popupNo } = useParams();
  const [startDate, setStartDate] = useState(null);

  const [popupStartDate, setPopupStartDate] = useState(null);
  const [popupEndDate, setPopupEndDate] = useState(null);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableCounts, setAvailableCounts] = useState({}); 
  const [count, setCount] = useState(1);
  const [popupInfo, setPopupInfo] = useState({ name: '팝업스토어', price: 1000 });

  const [timeSlots, setTimeSlots] = useState([]); 

  const limitPerson = 2;
  
  const generateTimeSlots = (openTimeStr, closeTimeStr) => {
    if (!openTimeStr || !closeTimeStr) return [];

    const [openH] = openTimeStr.split(":").map(Number);
    const [closeH] = closeTimeStr.split(":").map(Number);

    const slots = [];
    for (let h = openH; h < closeH; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
    }
    return slots;
  };

  // 날짜 비교
  const isSameDate = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // 과거인지 미래인지 체크
  const isPastTimeSlot = (slot, dateObj) => {
    if (!dateObj) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isSameDate(dateObj, today)) return false;

    const [hStr, mStr] = slot.split(":");
    const slotMinutes = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);

    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    return slotMinutes <= nowMinutes;
  };

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  useEffect(() => {
    const fetchPopupInfo = async () => {
      try {
        const res = await JwtAPI.get(`/popup-stores/${popupNo}`);

        const data = res.data;

        console.log('팝업 응답 데이터 👉', data);

        const start = parseDateString(data.startDate);
        const end = parseDateString(data.endDate);

        setPopupStartDate(start);
        setPopupEndDate(end);

        setPopupInfo({
          name: data.name,
          price: data.price ?? 1000,
        });

        const slots = generateTimeSlots(data.openTime, data.closeTime);
        setTimeSlots(slots);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let initialDate = start;
        if (today > start) {
          initialDate = today;
        }

        if (end && initialDate > end) {
          alert("현재 이 팝업스토어는 예약 가능한 날짜가 없습니다.");
          navigate(-1);
          return;
        }

        setStartDate(initialDate);

        fetchAllRemainingForDate(initialDate, slots);

      } catch (err) {
        console.error("팝업 정보 조회 실패:", err);
        alert("팝업 정보 조회에 실패했습니다. 잠시 후 다시 시도해주세요.");
        navigate(-1);
      }
    };

    fetchPopupInfo();
  }, [popupNo]);


  // 예약 가능 인원 조회 로직 (기존과 동일)
  const fetchAllRemainingForDate = (dateObj, slots = timeSlots) => {
    if (!dateObj) return;
    setAvailableCounts({});
    (slots || []).forEach((slot) => fetchRemaining(dateObj, slot));
  };

  const fetchRemaining = async (dateObj, timeSlot) => {
    if (!timeSlot || !dateObj) return;
    const reservationDate = formatDate(dateObj);
    try {
      const response = await JwtAPI.get("/reservations", {
        params: { popupNo: Number(popupNo), reservationDate, reservationTime: timeSlot },
      });
      setAvailableCounts((prev) => ({ ...prev, [timeSlot]: response.data.availableCount }));
    } catch (err) {
      console.error("남은 인원 조회 실패:", err);
      setAvailableCounts((prev) => ({ ...prev, [timeSlot]: null }));
    }
  };

  const increase = () => {
    if (!selectedTimeSlot) {
      alert("회차를 먼저 선택해주세요.");
      return;
    }
    const maxForSlot = availableCounts[selectedTimeSlot];
    if (typeof maxForSlot !== "number" || maxForSlot <= 0) {
      alert("해당 회차는 예약이 불가능합니다.");
      return;
    }
    const maxLimit = Math.min(maxForSlot, limitPerson);
    setCount((prev) => (prev >= maxLimit ? prev : prev + 1));
  };

  const decrease = () => setCount((prev) => (prev > 1 ? prev : 1));

  useEffect(() => {
    if (!selectedTimeSlot) return;
    const maxForSlot = availableCounts[selectedTimeSlot];
    if (typeof maxForSlot === 'number' && maxForSlot > 0) {
      const maxLimit = Math.min(maxForSlot, limitPerson);
      setCount((prev) => (prev > maxLimit ? maxLimit : prev));
    } else {
      setCount(1);
    }
  }, [selectedTimeSlot, availableCounts]);


  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  //      새로운 2단계 결제 로직으로 수정한 handlePayment
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  const handlePayment = async () => {
    if(!selectedTimeSlot) {
      alert("회차를 선택해주세요");
      return;
    }

    if (isPastTimeSlot(selectedTimeSlot, startDate)) {
      alert("이미 지난 시간대는 예약할 수 없습니다.");
      return;
    }

    if (count > limitPerson) {
      alert(`시간별 최대 ${limitPerson}명까지만 예약할 수 있습니다.`);
      return;
    }
    
    // 백엔드에 '결제 준비'를 요청할 예약 정보
    const reservationBody = {
      popupNo: Number(popupNo),
      reservationPersonnel: count,
      reservationDate: formatDate(startDate),
      reservationTime: selectedTimeSlot,
      // DTO에 맞게 필드명 설정
      reservationAmount: popupInfo.price * count,
    };

    try {
      // 1. 백엔드에 '결제 준비' 요청 (POST /reservations/prepare)
      const response = await JwtAPI.post('/reservations/prepare', reservationBody);
      const paymentInfo = response.data; // { orderId, amount, orderName }

      if(!paymentInfo || !paymentInfo.orderId) {
        throw new Error("결제 정보 생성에 실패했습니다.");
      }

      // 2. 백엔드로부터 받은 정보로 토스페이먼츠 결제창 호출
      const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
      const tossPayments = await loadTossPayments(clientKey);
      
      tossPayments.requestPayment('카드', {
        amount: paymentInfo.amount,
        orderId: paymentInfo.orderId,
        orderName: paymentInfo.orderName,
        customerName: "고객님", // 실제로는 로그인된 사용자 이름으로
        successUrl: 'http://localhost:8080/reservations/toss-success',
        failUrl: 'http://localhost:5173/payment-result?success=false',
      }).catch(async error => {
        if (error.code === 'USER_CANCEL') {
          alert('결제를 취소했습니다.');
          try {
            await JwtAPI.delete(`/reservations/pending/${paymentInfo.orderId}`);
            console.log("결제 취소로 인해 '결제대기' 예약이 성공적으로 삭제되었습니다.");
          } catch (deleteErr) {
            console.error("'결제대기' 예약 삭제 중 오류 발생 : ", deleteErr);
          }
        } else {
          alert(`결제 중 오류 발생: ${error.message}`);
        }
      });

    } catch (err) {
      const errorMessage = err.response ? err.response.data : "결제 요청에 실패했습니다. 잠시 후 다시 시도해주세요.";
      alert(errorMessage);
      console.error(err);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minSelectableDate = today > popupStartDate ? today : popupStartDate;

  return (
    <>
      <div className='caltitle'>
        📆 날짜를 선택해주세요
      </div>
      <DatePicker
        selected={startDate}
        onChange={(date) => { 
          setStartDate(date); 
          fetchAllRemainingForDate(date); 
          setSelectedTimeSlot(null);
        }}
        locale={ko}
        minDate={minSelectableDate}
        maxDate={popupEndDate}
        inline
      />
      <div className='subtitle'>
        🎫 회차를 선택해주세요
      </div>
      <div className="timeslot-container">
        {timeSlots.map((slot) => {
          const countForSlot = availableCounts[slot];

          const isDisabled =
            countForSlot === 0 ||
            countForSlot === null ||
            isPastTimeSlot(slot, startDate);
          return (
            <button
              key={slot}
              type="button"
              disabled={isDisabled}
              className={`timeslot-btn ${selectedTimeSlot === slot ? "selected" : ""}`}
              onClick={() => setSelectedTimeSlot(slot)}
            >
              <div>{slot}</div>
              {countForSlot !== undefined && (
                <div style={{ fontSize: "12px", marginTop: "1px" }}>
                  {countForSlot === null ? "조회 실패" : `예약 가능 인원: ${countForSlot}명`}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className='numticket'>
          😶 인원을 선택해주세요
        <div className='counter'>
          <button className="btn" onClick={decrease}>−</button>
          <span className="count">{count}</span>
          <button className="btn" onClick={increase}>+</button>
        </div>
      </div>
      <button className='resv' onClick={handlePayment}>
        {popupInfo.price * count}원 결제하기
      </button>
    </>
  );
}
export default Calendar;