import Header from "./components/Header.js";
import Medication from "./components/Medication.js";
import Mood from "./components/Mood.js";
import Main from "./screen/Main.js";

function App() {
  // fetch("http://localhost:8080/mood")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((e) => console.log("error"));

  // fetch("https://birdie-care-recipients.onrender.com/mood")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((e) => console.error("There's an error", e.message));

  return (
    <div>
      <Header />
      <Main />
      {/* <Mood /> */}
      {/* <Medication /> */}
    </div>
  );
}

export default App;
