import Header from "./components/Header.js";
// import Router from "./routes/Router.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screen/Main.js";
import Mood from "./components/Mood.js";
import Medication from "./components/Medication.js";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/medication" element={<Medication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
