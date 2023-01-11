import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

import {
  _date_to_GB_format,
  _format_date,
  _date_Picker,
  _fetch_data_func,
} from "../helper";

export function Health() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/27"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/health_by_date?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let healthData = [];
  healthData = fetchData.map((e) => e);

  let healthDataForTable = [];

  function formatHealthData() {
    for (let i = 0; i < healthData.length; i++) {
      healthData[i].event_type === "physical_health_observation"
        ? healthDataForTable.push([
            _date_to_GB_format(
              healthData[i].timestamp.slice(0, 4),
              healthData[i].timestamp.slice(5, 7),
              healthData[i].timestamp.slice(8, 10)
            ),
            healthData[i].event_type,
            healthData[i].note,
          ])
        : healthDataForTable.push([
            _date_to_GB_format(
              healthData[i].timestamp.slice(0, 4),
              healthData[i].timestamp.slice(5, 7),
              healthData[i].timestamp.slice(8, 10)
            ),
            healthData[i].event_type,
            healthData[i].note,
          ]);
    }

    return healthDataForTable;
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
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "note",
      label: "Note",
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
          title={"Health Obeservation"}
          data={formatHealthData()}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
