// Function for String date format
export function _date_to_string(yyyy, mm, dd) {
  const date = new Date(yyyy, mm - 1, dd);
  return date.toDateString();
}
