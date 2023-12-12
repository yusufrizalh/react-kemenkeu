import express from "express";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/routes.js";

const app = express();

try {
  // sync() -> create table if doesn't exist
  // sync({ force: true }) -> drop it first if already exist and create freshly new
  db.sync({ force: true });
  console.log("Database connection established...");
} catch (error) {
  console.log("Database connection failed: ", error);
}

app.use(cors());
app.use(express.json());
app.use("/", router);

let PORT = 8001;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
