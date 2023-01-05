import app from "./app.js";

// const port = normalizePort(process.env.PORT || "8080");
// app.set("port", port);

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
