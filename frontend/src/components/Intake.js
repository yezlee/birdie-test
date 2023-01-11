import React, { useEffect, useState } from "react";
import { FetchDataFunc } from "../helper/FetchDataFunc";
import _format_date from "../helper/_format_date";
import _date_Picker from "../helper/_date_picker";
import MUIDataTable from "mui-datatables";

export default function Intake() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/26"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await FetchDataFunc(
        `http://localhost:8080/intake_by_date?from=${_format_date(
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

  function formatIntakeData() {
    for (let i = 0; i < intakeData.length; i++) {
      intakeData[i].event_type === "food_intake_observation"
        ? intakeDataForTable.push([
            intakeData[i].timestamp.slice(0, 10),
            intakeData[i].meal,
            intakeData[i].timestamp.slice(4, 5),
            intakeData[i].note,
          ])
        : intakeDataForTable.push([
            intakeData[i].timestamp.slice(0, 10),
            intakeData[i].fluid === "regular" || "caffeinated"
              ? intakeData[i].fluid + " (fluid)"
              : intakeData[i].fluid,
            intakeData[i].observed.toString(),
            intakeData[i].consumed_volume_ml + "ml",
          ]);
    }

    return intakeDataForTable;
  }

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
