import express from "express";
import mongo from "mongoose";
import UsersRoute from "./routes/Users";
import cokie from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();
const app = express();

app.use(cokie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
const port = process.env.PORT || 3000;

// Routes

app.use("/api/users", UsersRoute);
app.get("/", (req, res) => {
  res.json("Hello World!");
});
// Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error("Mongo URI is not set");
}
mongo
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
