import mysql from "mysql";
import * as config from "../../config.js";

const connection = mysql.createConnection({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

connection.connect((e) => {
  if (e) throw e;
  console.log("Connect!!!!!!");

  connection.query(
    "SELECT * FROM events WHERE care_recipient_id = 'ad3512a6-91b1-4d7d-a005-6f8764dd0111' AND event_type = 'mood_observation' ORDER BY timestamp DESC;",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );
});
