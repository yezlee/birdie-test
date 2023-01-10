import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FetchDataFunc } from "../helper/FetchDataFunc";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Mood() {
  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
        "https://birdie-care-recipients.onrender.com/mood"
      );
      setfetchData(response);
    };

    fetchResponse();
  }, []);

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
    <div>
      <div className="h-1/3 w-1/3">
        <Pie className="" data={moodDataForDoughnut} />
      </div>
    </div>
  );
}
