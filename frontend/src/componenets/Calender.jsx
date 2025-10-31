import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calender.css';
import { ko } from "date-fns/locale";

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const twoWeeksLater = new Date(new Date().setDate(new Date().getDate() + 14));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={ko}
      minDate={new Date()}
        maxDate={twoWeeksLater}
        inline
    />
  );
}

export default Calendar;