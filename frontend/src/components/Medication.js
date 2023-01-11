import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";

import { _format_date, _date_Picker, _fetch_data_func } from "../helper";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function Medication() {
  const [fetchData, setfetchData] = useState([]);
  // Initialize the date for DatePicker as there are limited data
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/26"));

  // Fetch data
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/medication_by_date/?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let medicationData = [];
  medicationData = fetchData.map((e) => e.event_type);

  // Generate data from server to display
  function countMedication() {
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

  // Chart property; data
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
        data: countMedication(),
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
    <div className="max-w-7xl mx-auto flex-col justify-center items-center">
      {/* calling function _date_Picker from helper */}
      {_date_Picker(startDate, endDate, setStartDate, setEndDate)}

      <div className="h-1/3 w-1/3">
        <PolarArea data={data} />
      </div>
    </div>
  );
}
