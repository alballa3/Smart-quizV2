import express from "express";
import mongo from "mongoose";
import UsersRoute from "./routes/Users";

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Routes

app.use("/api/users", UsersRoute);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to MongoDB
mongo
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
