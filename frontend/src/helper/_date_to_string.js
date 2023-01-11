export function _date_to_string(yyyy, mm, dd) {
  const date = new Date(yyyy, mm, dd);
  return date.toDateString();
}
