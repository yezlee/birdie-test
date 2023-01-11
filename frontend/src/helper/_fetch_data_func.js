// Function for getting data from API URL and return to data object
export async function _fetch_data_func(apiURL) {
  const fetchApiResponse = await fetch(apiURL, {
    method: "GET",
  });
  const response = await fetchApiResponse.json();
  const result = response.map((e) => Object.values(e));
  const flat = result.flat();
  return flat;
}
