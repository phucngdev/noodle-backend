const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/connect");
const routerAuth = require("./routes/auth.route");
const routerUser = require("./routes/user.route");
const routerNoodle = require("./routes/noodle.route");
const routerAuthor = require("./routes/author.route");
const routerMail = require("./routes/mail.route");

// kết nối mongodb
connectDB();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/user", routerUser);
app.use("/api/v1/product", routerNoodle);
app.use("/api/v1/author", routerAuthor);
app.use("/api/v1/email", routerMail);

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(`start server http://localhost:${PORT}`);
});
