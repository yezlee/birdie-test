import React, { useEffect, useState } from "react";
import {
  _date_to_GB_format,
  _format_date,
  _date_Picker,
  _fetch_data_func,
} from "../helper";
import MUIDataTable from "mui-datatables";

export function Task() {
  const [fetchData, setfetchData] = useState([]);
  // Initialize the date for DatePicker as there are limited data
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/27"));

  // Fetch data
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/task_by_date?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let taskData = [];
  taskData = fetchData.map((e) => e);

  let taskDataForTable = [];

  // Generate data from server to display
  function formatTaskData() {
    for (let i = 0; i < taskData.length; i++) {
      taskDataForTable.push([
        _date_to_GB_format(
          taskData[i].timestamp.slice(0, 4),
          taskData[i].timestamp.slice(5, 7),
          taskData[i].timestamp.slice(8, 10)
        ),
        taskData[i].task_definition_description,
        taskData[i].task_schedule_note === ""
          ? "-"
          : taskData[i].task_schedule_note,
      ]);
    }

    return taskDataForTable;
  }

  // colums for the table
  const columns = [
    {
      name: "date",
      label: "ㅤDATEㅤ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "task_definition_description",
      label: "Task Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "task_schedule_note",
      label: "Task Schedule Note",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="max-w-7xl mx-auto flex-col justify-center items-center sm:px-6 lg:px-8">
      {/* ctasking function _date_Picker from helper */}
      {_date_Picker(startDate, endDate, setStartDate, setEndDate)}
      <div className="w-4/5">
        <MUIDataTable
          title={"Completed Tasks"}
          data={formatTaskData()}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
