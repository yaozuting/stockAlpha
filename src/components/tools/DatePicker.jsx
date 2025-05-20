import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateSelector({ setDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        console.log("Selected date:", selectedDate);
        setDate(selectedDate);
    }, [selectedDate]);

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date("2025-04-24")}
            placeholderText="Click to select a date"
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
        />
    );
}

export default DateSelector;
