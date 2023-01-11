import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FetchDataFunc } from "../helper/FetchDataFunc";
import _date_Picker from "../helper/_date_picker";
import "react-datepicker/dist/react-datepicker.css";
import _format_date from "../helper/_format_date";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Mood() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/26"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
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

  const moodDataForDoughnut = {
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

      <div className="h-2/5 w-2/5">
        <Pie className="" data={moodDataForDoughnut} />
      </div>
    </div>
  );
}
