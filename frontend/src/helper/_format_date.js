// Change date from date-picker to yyyy-mm-dd format for getting query
export function _format_date(date) {
  let year = "";
  let month = "";
  let day = "";

  year = date.getFullYear(); // 2019
  month = date.getMonth() + 1; //4
  day = date.getDate(); // 23

  return `${year}-${month}-${day}`;
}
