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
import _date_Picker from "../helper/_date_picker";
import "react-datepicker/dist/react-datepicker.css";
import _format_date from "../helper/_format_date";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Medication() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/26"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
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

      <div className="h-2/5 w-2/5">
        <PolarArea data={data} />
      </div>
    </div>
  );
}
