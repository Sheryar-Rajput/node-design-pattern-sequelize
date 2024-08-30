const express = require("express");
const db = require("./src/database/db");
const app = express();

let context = {
  db: undefined,
  redis: undefined,
  validation: undefined,
};

app.listen(3000, async () => {
  try {
    console.log("app starting");
    context.db = await db();
    console.log("server is listening on 3000");
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.status(200).send("ok server is running");
});
