import React, { useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import "./App.css"

import { data } from "./data.jsx";
import Charts from './Chart.jsx'
export const App = () => {
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].arrival_date_year == state[0].startDate.getFullYear() &&
        data[i].arrival_date_month ==
        state[0].startDate.toLocaleString("default", { month: "long" }) &&
        data[i].arrival_date_day_of_month == state[0].startDate.getDate()
      ) {
        setstart(i);
       
        break;
      }
    }

    for (let i = data.length-1; i >= 0; i--) {
      if (
        data[i].arrival_date_year == state[0].endDate.getFullYear() &&
        data[i].arrival_date_month ==
        state[0].endDate.toLocaleString("default", { month: "long" }) &&
        data[i].arrival_date_day_of_month == state[0].endDate.getDate()
      ) {
        setend(i);
      
        break;
      }
    }
  }, [state]);

  // console.log(
    // "startDate",
   //  state[0].startDate.getDate(),
   //  state[0].startDate.toLocaleString("default", { month: "long" }),
  //   state[0].startDate.getFullYear()
  // );



  return (
    <div className="container">
    <h1 className="text-center mt-4 pb-3">Hotel Booking Charts</h1>
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="backwards"
        className="d-flex justify-content-center"
        
      />
      <Charts start={start} end={end} />
      ;
    </div>
  );
};
