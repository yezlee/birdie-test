import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";

import { _format_date, _date_Picker, _fetch_data_func } from "../helper";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Mood() {
  const [fetchData, setfetchData] = useState([]);
  // Initialize the date for DatePicker as there are limited data
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/05/10"));

  // Fetch data
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/mood_by_date?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let moodData = [];
  moodData = fetchData.map((e) => e.mood);

  // Generate data from server to display
  function countMood() {
    let happyCount = 0;
    let okayCount = 0;
    let sadCount = 0;

    for (let i = 0; i < moodData.length; i++) {
      if (moodData[i] === "happy") {
        happyCount++;
      } else if (moodData[i] === "okay") {
        okayCount++;
      } else {
        sadCount++;
      }
    }

    return [happyCount, okayCount, sadCount];
  }

  // Chart property; data
  const data = {
    labels: ["Happy", "Okay", "Sad"],
    datasets: [
      {
        label: "# of Votes",
        data: countMood(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto flex-col justify-center items-center">
      {/* calling function _date_Picker from helper */}
      {_date_Picker(startDate, endDate, setStartDate, setEndDate)}

      <div className="h-1/3 w-1/3">
        <Pie className="" data={data} />
      </div>
    </div>
  );
}
