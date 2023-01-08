function App() {
  // fetch("http://localhost:8080/mood")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((e) => console.log("error"));

  fetch("https://birdie-care-recipients.onrender.com/mood")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => console.log("error"));

  return (
    <div>
      <p>Hello, world!</p>
    </div>
  );
}

export default App;
