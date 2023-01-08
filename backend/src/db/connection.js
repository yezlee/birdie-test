import mysql from "mysql2/promise.js";
import * as config from "../../config.js";

const pool = mysql.createPool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

const getCon = async () => {
  return await pool.getConnection(async function (err, connection) {
    if (err) throw err;
    connection;
  });
};

// A function for running query and returning data
async function db(query) {
  const connection = await getCon();
  let [rows, fields] = await connection.query(query, []);

  connection.release();

  return rows;
}

export default db;
