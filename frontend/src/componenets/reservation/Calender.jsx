import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));

  const [count, setCount] = useState(1);
  const increase = () => setCount(count + 1);
  const decrease = () => count > 1 && setCount(count - 1);

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
      <div className='timetable'>
        <div className='timeticket'>
          <p>오후 12:00</p>
          <p>300명</p>
        </div>
        <div className='timeticket'>
          <p>오후 13:00</p>
          <p>300명</p></div>
        <div className='timeticket'>
          <p>오후 14:00</p>
          <p>300명</p>
          </div>
      </div>
      <div className='numticket'>
          😶 인원을 선택해주세요
        <div className='counter'>
          <button className="btn" onClick={decrease}>−</button>
          <span className="count">{count}</span>
          <button className="btn" onClick={increase}>+</button>
        </div>
        
      </div>

      <button className='resv'>예매하기</button>
    </>
  );
}

export default Calendar;