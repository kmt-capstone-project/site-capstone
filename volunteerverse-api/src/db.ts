import {Pool} from "pg";
import { getDatabaseURI } from "./config";

export const db = new Pool({
  connectionString: getDatabaseURI(),
});

db.connect((err: { stack: any }) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Successfully connected to postgres database!");
  }
});