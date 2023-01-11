import Header from "./screen/Header.js";
// import Router from "./routes/Router.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./screen/Main.js";

import {
  GeneralNote,
  Health,
  Intake,
  Medication,
  Mood,
  Task,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/health" element={<Health />} />
        <Route path="/general" element={<GeneralNote />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
