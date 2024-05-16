import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/features.js";
import detailsRoute from "./routes/Details.js";
import cors from "cors";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json()); 
app.use(cors());

config({
  path: "./.env",
});

connectDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

app.use("/api/v1/details",detailsRoute);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
