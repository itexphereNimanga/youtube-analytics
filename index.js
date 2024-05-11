const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes/router");
const cors = require("cors");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secretKey);

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/test", (req, res) => {
  res.send("This is the backend");
});
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));
