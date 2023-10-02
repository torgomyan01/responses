import React, { useState } from 'react';
import './calendar.css';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import 'dayjs/locale/ru';

const style = {
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0
  }
};

function Calendar() {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);

  const [valueStart, setValueStart] = useState<any>(null);
  const [valueEnd, setValueEnd] = useState<any>(null);

  function CloseDate() {
    setValueStart(null);
    setValueEnd(null);
    setView(false);
  }

  function SaveInfo() {
    if (valueStart && valueEnd) {
      setView(true);
      setOpenClose(false);
    }
  }
  console.log(dayjs(valueStart).format());

  return (
    <div className="def-calendar">
      <button className="def-calendar-btn" onClick={() => setOpenClose(!openClose)}>
        <i className="fa-regular fa-calendar-range me-2" />
        {view ? (
          <>
            {dayjs(valueStart).locale('ru').format('MMM D, YYYY')}
            <span className="mx-2">-</span>
            {dayjs(valueEnd).locale('ru').format('MMM D, YYYY')}
          </>
        ) : (
          'Выбрать дата'
        )}
      </button>

      {openClose && (
        <div className="def-calendar-body">
          <div className="mb-4">
            <DatePicker
              format="MM-DD-YYYY"
              label="Начало периода"
              className="def-calendar-input"
              value={valueStart}
              sx={style}
              onChange={(value) => setValueStart(value)}
            />
          </div>
          <div>
            <DatePicker
              format="MM-DD-YYYY"
              label="Начало периода"
              className="def-calendar-input"
              value={valueEnd}
              sx={style}
              onChange={(value) => setValueEnd(value)}
            />
          </div>
          <div className="mt-5">
            <Button variant="contained" className="btn-blue outline py-3 w-100" onClick={CloseDate}>
              сбросить
            </Button>
          </div>
          <div className="mt-4">
            <Button variant="contained" className="btn-blue py-3 w-100" onClick={SaveInfo}>
              применить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
