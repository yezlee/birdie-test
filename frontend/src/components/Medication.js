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

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Medication() {
  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
        "http://localhost:8080/medication2/?from=2019-04-23&to=2019-04-26"
      );
      setfetchData(response);
    };

    fetchResponse();
  }, []);

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
      <div className="h-1/2 w-1/2">
        <PolarArea data={data} />
      </div>
    </div>
  );
}
