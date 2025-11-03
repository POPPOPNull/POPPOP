import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));

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
      <div>
        <div>오후 12:00</div>
        <div>오후 13:00</div>
      </div>
    </>
  );
}

export default Calendar;