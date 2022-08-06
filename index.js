const express = require("express");
var cors = require("cors");
const connect = require("./src/configs/db");

const { register, login } = require("./src/controller/auth.user.controller");
const userController = require("./src/controller/user.controllet");
const newsController = require("./src/controller/news.conrtroller");

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.post("/register", register);
app.post("/login", login);

app.use("/news", newsController);

app.use("/users", userController);


const PORT = process.env.PORT || 9555;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.error(err.message);
  }
});
