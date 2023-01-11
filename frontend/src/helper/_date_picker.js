import DatePicker from "react-datepicker";

export default function _date_Picker(
  startDate,
  endDate,
  setStartDate,
  setEndDate
) {
  return (
    <div className="grid my-10 items-center">
      <div className="flex w-full justify-around text-lg">
        <div>Start Date</div>
        <div>End Date</div>
      </div>
      <div className="flex">
        <div className="p-1">
          <DatePicker
            className="border-2 py-1 text-center"
            selected={startDate}
            isClearable
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd-MM-yyyy"
            placeholderText="Start Date"
            includeDateIntervals={[
              {
                start: new Date("2019/04/23"),
                end: new Date("2019/05/12"),
              },
            ]}
          />
        </div>
        <div className="p-1">
          <DatePicker
            className=" border-2 py-1 text-center "
            selected={endDate}
            isClearable
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd-MM-yyyy"
            placeholderText="End Date"
            includeDateIntervals={[
              {
                start: new Date("2019/04/23"),
                end: new Date("2019/05/12"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
