import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";
import JwtAPI from '../../api/JwtAPI';

function Calendar() {
  const navigate = useNavigate();
  const { popupNo } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [availableCounts, setAvailableCounts] = useState({}); 

  const [count, setCount] = useState(1);

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

    setCount((prev) => {
      if (prev >= maxForSlot) {
        alert(`해당 회차는 최대 ${maxForSlot}명까지 예약할 수 있습니다.`);
        return prev;
      }
      return prev + 1;
    });
  };

  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const timeSlots = [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 날짜 바뀔 때 시간 조회
  const fetchAllRemainingForDate = (dateObj) => {
    if (!dateObj) return;

    setAvailableCounts({});

    timeSlots.forEach((slot) => {
      fetchRemaining(dateObj, slot);
    });
  };

  useEffect(() => {
    fetchAllRemainingForDate(startDate);
  },
  []);

  // 예약 가능 인원
  const fetchRemaining = async (dateObj, timeSlot) => {
    if (!timeSlot || !dateObj) return;

    const reservationDate = formatDate(dateObj);
    const reservationTime = timeSlot;

    try {
      const response = await JwtAPI.get("/reservations", {
        params: {
          popupNo: Number(popupNo),
          reservationDate,
          reservationTime,
        },
      });

      const availableCount = response.data.availableCount;

      setAvailableCounts((prev) => ({
        ...prev,
        [timeSlot]: availableCount, 
      }));
    } catch (err) {
      console.error("남은 인원 조회 실패:", err);
      setAvailableCounts((prev) => ({
        ...prev,
        [timeSlot]: null,            
      }));
    }
  };

  useEffect(() => {
    if (!selectedTimeSlot) return;

    const maxForSlot = availableCounts[selectedTimeSlot];

    if (typeof maxForSlot === "number" && maxForSlot > 0) {
      setCount((prev) => (prev > maxForSlot ? maxForSlot : prev));
    }
  }, [selectedTimeSlot, availableCounts]);


  // 예약
  const handleSubmit = async () => {
    if(!selectedTimeSlot) {
      alert("회차를 선택해주세요");
      return;
    }
    
    const [hourStr, minuteStr] = selectedTimeSlot.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    const reservationDate = `${year}-${month}-${day}`;

    const reservationTime = `${hourStr}:${minuteStr}`;

    const body = {
      popupNo,                    
      reservationPersonnel: count, 
      reservationDate,           
      reservationTime            
    };

    console.log('보낼 데이터:', body);

    const response = await JwtAPI.post('/reservations', body);
    alert('예약이 완료되었습니다!');
      console.log(response.data);
    navigate("/myreservation", { replace: true });
  };

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
      }}
      locale={ko}
      minDate={new Date()}
      maxDate={twoWeeksLater}
      inline
      />
      <div className='subtitle'>
        🎫 회차를 선택해주세요
      </div>
      <div className="timeslot-container">
        {timeSlots.map((slot) => {
          const countForSlot = availableCounts[slot];

          const isDisabled =
            countForSlot === 0 || countForSlot === null; 

          return (
            <button
              key={slot}
              type="button"
              disabled={isDisabled}
              className={`timeslot-btn 
                ${selectedTimeSlot === slot ? "selected" : ""}`}
              onClick={() => {
                setSelectedTimeSlot(slot);
              }}
            >
              <div>{slot}</div>

              {countForSlot !== undefined && (
                <div style={{ fontSize: "12px", marginTop: "1px" }}>
                  {countForSlot === null
                    ? "조회 실패"
                    : `예약 가능 인원: ${countForSlot}명`}
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

      <button className='resv' onClick={handleSubmit}>예매하기</button>
    </>
  );
}
export default Calendar;