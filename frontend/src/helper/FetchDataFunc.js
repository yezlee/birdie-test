export async function FetchDataFunc(apiURL) {
  const fetchApiResponse = await fetch(apiURL, {
    method: "GET",
  });
  const response = await fetchApiResponse.json();
  const result = response.map((e) => Object.values(e));
  const flat = result.flat();
  return flat;
}
