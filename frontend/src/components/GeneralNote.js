import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import {
  _date_to_string,
  _format_date,
  _date_Picker,
  _fetch_data_func,
} from "../helper";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyMedical,
  faHandHoldingHand,
} from "@fortawesome/free-solid-svg-icons";

export function GeneralNote() {
  const [fetchData, setfetchData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019/04/23"));
  const [endDate, setEndDate] = useState(new Date("2019/04/24"));

  useEffect(() => {
    const fetchResponse = async () => {
      const response = await _fetch_data_func(
        `https://birdie-care-recipients.onrender.com/general_by_date?from=${_format_date(
          startDate
        )}&to=${_format_date(endDate)}`
      );
      setfetchData(response);
    };

    fetchResponse();
  }, [startDate, endDate]);

  let generalData = [];
  generalData = fetchData.map((e) => e);

  // Timeline card for screen
  function timelineCard(date, note, careGiverID) {
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--general"
        contentStyle={{ background: "#54c5c1", color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  #54c5c1" }}
        date={date}
        iconStyle={{ background: "#00264d", color: "#fff" }}
        icon={
          <FontAwesomeIcon className="h-10 w-10" icon={faHandHoldingHand} />
        }
      >
        <h3 className="vertical-timeline-element-title text-lg font-bold text-birdie_dark_blue">
          {/* Call function _date_to_string from helper */}
          {_date_to_string(
            date.slice(0, 4),
            date.slice(5, 7) - 1,
            date.slice(8, 10)
          )}
          <span className="font-normal text-birdie_light_dark_blue text-base">{` (${date.slice(
            11,
            19
          )})`}</span>
        </h3>
        <h4 className="vertical-timeline-element-subtitle text-birdie_melon_light">
          Caregiver id : {careGiverID}
        </h4>
        <p>{note}</p>
      </VerticalTimelineElement>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex-col justify-center items-center">
      {/* Call function _date_Picker from helper */}
      {_date_Picker(startDate, endDate, setStartDate, setEndDate)}
      <VerticalTimeline>
        <div>
          {/* Generate timeline card */}
          {generalData.map((e) => {
            return timelineCard(e.timestamp, e.note, e.caregiver_id);
          })}
        </div>
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          icon={
            <FontAwesomeIcon
              className="h-10 w-10"
              icon={faHouseChimneyMedical}
            />
          }
        />
      </VerticalTimeline>
    </div>
  );
}
