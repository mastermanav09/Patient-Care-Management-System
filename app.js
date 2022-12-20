require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./routes/index.js");

const path = require("path");

const fs = require("fs");
fs.mkdirSync(path.join(__dirname, "public", "uploads"), { recursive: true });

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(
  "*/public/invoices",
  express.static(path.join(__dirname, "public/invoices"))
);

app.use(
  "*/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started on port: ", port);
});
