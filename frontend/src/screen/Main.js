import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faPills,
  faFaceSmile,
  faHeartPulse,
  faNoteSticky,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex-col justify-center h-[calc(100vh-5rem)]">
      <div className="flex justify-center items-center flex-1 mx-auto max-w-7xl h-full px-2 sm:px-6 lg:px-8 py-20 bg-opacity-10">
        <div className="grid grid-cols-1 md:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border">
          {/* Intake */}
          <Link to="/intake">
            <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_red_orange text-white shadow-lg shadow-red-200">
                <FontAwesomeIcon className="h-10 w-10" icon={faUtensils} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">Intake</p>
              <p className="mt-2 text-sm text-slate-500">
                See what kind of meals/snacks took and how much volume of fluids
                are consumed.
              </p>
            </div>
          </Link>

          {/* mood */}
          <Link to="/mood">
            <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_yellow text-white shadow-lg shadow-yellow-200">
                <FontAwesomeIcon className="h-10 w-10" icon={faFaceSmile} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">Mood</p>
              <p className="mt-2 text-sm text-slate-500">
                Check the graph of what mood is care recipients in days.
              </p>
            </div>
          </Link>

          {/* medication */}
          <Link to="/medication">
            <div className="p-10 flex flex-col items-center text-center group   md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_light_dark_blue text-white shadow-lg shadow-birdie_light_dark_blue_shadow">
                <FontAwesomeIcon className="h-10 w-10" icon={faPills} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">
                Medication
              </p>
              <p className="mt-2 text-sm text-slate-500">
                You can check the medication taken information with the polar
                area chart.
              </p>
            </div>
          </Link>

          {/* Health */}
          <Link to="/health">
            <div className="p-10 flex flex-col items-center text-center group   md:lg:xl:border-r hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_melon text-white shadow-lg shadow-birdie_melon_shadow">
                <FontAwesomeIcon className="h-10 w-10" icon={faHeartPulse} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">Health</p>
              <p className="mt-2 text-sm text-slate-500">
                Physical and mental type of health observation with the note in
                the table.
              </p>
            </div>
          </Link>

          {/* Genaral note */}
          <Link to="/general">
            <div className="p-10 flex flex-col items-center text-center group    md:lg:xl:border-r hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_skyblue text-white shadow-lg shadow-sky-200">
                <FontAwesomeIcon className="h-10 w-10" icon={faNoteSticky} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">
                General notes
              </p>
              <p className="mt-2 text-sm text-slate-500">
                General notes from a caregiver on the timeline.
              </p>
            </div>
          </Link>

          {/* All data */}
          <Link to="/task">
            <div className="p-10 flex flex-col items-center text-center group hover:bg-slate-50 cursor-pointer">
              <span className="p-5 rounded-full bg-birdie_purple text-white shadow-lg shadow-purple-200">
                <FontAwesomeIcon className="h-10 w-10" icon={faListCheck} />
              </span>
              <p className="text-xl font-medium text-slate-700 mt-3">
                Completed tasks
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Stored all the completed tasks with descriptions and schedule
                notes.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
