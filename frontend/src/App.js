import Header from "./components/Header.js";
import Mood from "./components/Mood.js";

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
      <Mood />
    </div>
  );
}

export default App;
