import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";
import JwtAPI from '../../api/JwtAPI';

function Calendar() {
  const { popupNo } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [availableCount, setAvailableCount] =useState(null);

  const [count, setCount] = useState(1);
  const increase = () => setCount(count + 1);
  const decrease = () => count > 1 && setCount(count - 1);

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

  // const formatDate = (dateObj) => {
  //   const year = dateObj.getFullYear();
  //   const month = String(dateObj.getMonth()+1).padStart(2, '0');
  //   const day = String(dateObj.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // };

//   const remaining = async (dateObj, timeSlot) => {
//   if (!timeSlot) return;

//   const reservationDate = formatDate(dateObj);

//   try {
//     const response = await JwtAPI.get('/reservations', {
//       params: {
//         popupNo,
//         date: reservationDate,
//         time: timeSlot,
//       },
//     });

//     setAvailableCount(response.data.availableCount);
//   } catch (err) {
//     console.error("남은 인원 조회 실패:", err);
//     setAvailableCount(null);
//   }
// };


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
  };

  return (
    <>
      <div className='caltitle'>
        📆 날짜를 선택해주세요
      </div>
      <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={ko}
      minDate={new Date()}
      maxDate={twoWeeksLater}
      inline
      />
      <div className='subtitle'>
        🎫 회차를 선택해주세요
      </div>
      <div className="timeslot-container">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={
              `timeslot-btn ${selectedTimeSlot === slot ? "selected" : ""}`
            }
            onClick={() => setSelectedTimeSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* {selectedTimeSlot && (
        <div style={{ marginBottom: "10px", fontWeight: "600", color: "white" }}>
          {availableCount !== null && `현재 남은 인원: ${availableCount}명`}
        </div> */}

{/* )} */}

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


{/* <DatePicker
  selected={startDate}
  onChange={(date) => {
    setStartDate(date);
  
    if (selectedTimeSlot) {
      remaining(date, selectedTimeSlot);
    }
  }}
  locale={ko}
  minDate={new Date()}
  maxDate={twoWeeksLater}
  inline
/> */}

{/* <div className="timeslot-container">
  {timeSlots.map((slot) => (
    <button
      key={slot}
      type="button"
      className={`timeslot-btn ${selectedTimeSlot === slot ? "selected" : ""}`}
      onClick={() => {
        setSelectedTimeSlot(slot);
        remaining(startDate, slot);
      }}
    >
      {slot}
    </button>
  ))}
</div> */}

// const handleSubmit = async () => {
//   if (!selectedTimeSlot) {
//     alert("회차를 선택해주세요");
//     return;
//   }

//   if (availableCount === null) {
//     await remaining(startDate, selectedTimeSlot);
//   }

//   if (availableCount !== null && count > availableCount) {
//     alert(`해당 회차의 남은 인원이 부족합니다. (남은 인원: ${availableCount}명)`);
//     return;
//   }

//   const [hourStr, minuteStr] = selectedTimeSlot.split(":");
//   const reservationDate = formatDate(startDate);
//   const reservationTime = `${hourStr}:${minuteStr}`;

//   const body = {
//     popupNo,
//     reservationPersonnel: count,
//     reservationDate,
//     reservationTime
//   };

//   console.log('보낼 데이터:', body);

//   try {
//     const response = await JwtAPI.post('/reservations', body);
//     alert('예약이 완료되었습니다!');
//     console.log(response.data);

//     remaining(startDate, selectedTimeSlot);
//   } catch (err) {
//     console.error("예약 실패:", err);
//     alert("예약에 실패했습니다.");
//   }
// };
