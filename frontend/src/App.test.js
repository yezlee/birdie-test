import {
  _date_to_GB_format,
  _fetch_data_func,
  _format_date,
  _date_to_string,
} from "./helper";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing helper function _date_to_GB_format to get the correct data", () => {
  test("_date_to_GB_format should return the GB date format", () => {
    expect(_date_to_GB_format("2019", "07", "26")).toBe("26-07-2019");
  });
});

describe("Testing _fetch_data_func to get the correct data", () => {
  test("_fetch_data_func should return the exact same care_recipient_id and event_type", async () => {
    const result = await _fetch_data_func(
      "https://birdie-care-recipients.onrender.com/mood"
    );
    expect(result[27].care_recipient_id).toEqual(
      "df50cac5-293c-490d-a06c-ee26796f850d"
    );
    expect(result[3].event_type).toEqual("mood_observation");
  });
});

describe("Testing _format_date to get the correct data", () => {
  test("_format_date should return yyyy-MM-dd format date", () => {
    const result = _format_date(
      new Date("Thu Dec 12 2019 00:00:00 GMT+0100 (British Summer Time)")
    );
    expect(result).toEqual("2019-12-11");
  });
});

describe("Testing _date_to_string to get the correct data", () => {
  test("_date_to_string should return String type date", () => {
    const result = _date_to_string("2019", "04", "23");
    expect(result).toEqual("Tue Apr 23 2019");
  });
});
