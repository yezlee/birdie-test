import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Mood() {
  // fetch("http://localhost:8080/mood")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((e) => console.log("error"));

  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    fetch("https://birdie-care-recipients.onrender.com/mood")
      .then((response) => response.json())
      .then((result) => setfetchData(result))
      .catch((e) => console.error("There's an error", e.message));
  }, []);

  let moodData = [];
  moodData = fetchData.map((e) => e.payload.mood);

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

  console.log("countMood() test : ", countMood());
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
        <Doughnut className="" data={moodDataForDoughnut} />
      </div>
    </div>
  );
}

export default Mood;