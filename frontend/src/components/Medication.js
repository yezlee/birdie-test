import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { FetchDataFunc } from "../helper/FetchDataFunc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _format_date from "../helper/_format_date";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Medication() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/25"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
        `https://birdie-care-recipients.onrender.com/medication2/?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
        // ` http://localhost:8080/medication2/?from=2019-04-23&to=2019-04-28`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let medicationData = [];
  medicationData = fetchData.map((e) => e.event_type);

  function countMood() {
    let takenCount = 0;
    let partiallyCount = 0;
    let maybeCount = 0;
    let notTakenCount = 0;

    for (let i = 0; i < medicationData.length; i++) {
      if (medicationData[i] === "regular_medication_taken") {
        takenCount++;
      } else if (medicationData[i] === "regular_medication_partially_taken") {
        partiallyCount++;
      } else if (medicationData[i] === "regular_medication_maybe_taken") {
        maybeCount++;
      } else {
        notTakenCount++;
      }
    }

    return [takenCount, partiallyCount, maybeCount, notTakenCount];
  }

  console.log("countMood() : ", countMood());
  const data = {
    labels: [
      "Regular medication taken",
      "Regular medication partially taken",
      "Regular medication maybe taken",
      "Regular medication not taken",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: countMood(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(25, 206, 86, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="text-lg">
        <DatePicker
          className=" bg-red-300"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd-MM-yyyy"
        />
        <DatePicker
          className=" bg-blue-300"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd-MM-yyyy"
        />
      </div>
      <div className="h-1/2 w-1/2">
        <PolarArea data={data} />
      </div>
    </div>
  );
}
