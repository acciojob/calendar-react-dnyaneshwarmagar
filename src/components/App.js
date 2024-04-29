import React, { useState } from 'react';
import './App.css';

function App() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const handleYearDoubleClick = () => {
    const newYear = prompt('Enter a new year:');
    if (newYear && !isNaN(newYear)) {
      setYear(parseInt(newYear));
    }
  };

  const handlePrevMonth = () => {
    setMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const calendarDays = [];

    let dayCount = 1;
    for (let i = 0; i < 6; i++) {
      const weekDays = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCount > totalDays) {
          weekDays.push(<td key={`${i}-${j}`}></td>);
        } else {
          weekDays.push(<td key={`${i}-${j}`}>{dayCount}</td>);
          dayCount++;
        }
      }
      calendarDays.push(<tr key={i}>{weekDays}</tr>);
      if (dayCount > totalDays) break;
    }

    return calendarDays;
  };

  return (
    <div className="app">
      <h1>Calendar</h1>
      <div className="controls">
        <button onClick={handlePrevMonth}>Prev</button>
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <span onDoubleClick={handleYearDoubleClick}>{year}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendarDays()}
        </tbody>
      </table>
    </div>
  );
}

export default App;
