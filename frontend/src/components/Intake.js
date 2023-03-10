import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import {
  _date_to_GB_format,
  _format_date,
  _date_Picker,
  _fetch_data_func,
} from "../helper";

export function Intake() {
  const [fetchData, setfetchData] = useState([]);
  // Initialize the date for DatePicker as there are limited data
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/26"));

  // Fetch data
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/intake_by_date?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let intakeData = [];
  intakeData = fetchData.map((e) => e);

  let intakeDataForTable = [];

  // Generate data from server to display
  function formatIntakeData() {
    for (let i = 0; i < intakeData.length; i++) {
      intakeData[i].event_type === "food_intake_observation"
        ? intakeDataForTable.push([
            _date_to_GB_format(
              intakeData[i].timestamp.slice(0, 4),
              intakeData[i].timestamp.slice(5, 7),
              intakeData[i].timestamp.slice(8, 10)
            ),
            intakeData[i].meal,
            intakeData[i].timestamp.slice(4, 5),
            intakeData[i].note,
          ])
        : intakeDataForTable.push([
            _date_to_GB_format(
              intakeData[i].timestamp.slice(0, 4),
              intakeData[i].timestamp.slice(5, 7),
              intakeData[i].timestamp.slice(8, 10)
            ),
            intakeData[i].fluid === "regular" || "caffeinated"
              ? intakeData[i].fluid + " (fluid)"
              : intakeData[i].fluid,
            intakeData[i].observed.toString(),
            intakeData[i].consumed_volume_ml + "ml",
          ]);
    }

    return intakeDataForTable;
  }

  // colums for the table
  const columns = [
    {
      name: "date",
      label: "DATE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Fluid/Meal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "observed",
      label: "Observed",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "note",
      label: "Consumed Volume(ml)/Note",
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
      {/* calling function _date_Picker from helper */}
      {_date_Picker(startDate, endDate, setStartDate, setEndDate)}
      <div className="w-4/5">
        <MUIDataTable
          title={"Intake Obeservation"}
          data={formatIntakeData()}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
