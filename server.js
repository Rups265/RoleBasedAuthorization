const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
require("./configs/db.config");
const { MONGO_URI, DB_NAME } = require("./configs/server.config");

const {
  Auth,
  Role,
  Blog,
  ReviewAndComment,
  Moderator,
} = require("./routes/index.routes");
app.use(cors("*"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Db_URL = MONGO_URI + "/" + DB_NAME;
app.use(
  session({
    secret: "454654654esdg54g5a4ga4df",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: Db_URL,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  console.log("HTTP method is " + req.method + ", URL -" + req.url);
  next();
});

app.use("/api/v1/auth", Auth);
app.use("/api/v1/user", Blog);
app.use("/api/v1/user", ReviewAndComment);
app.use("/api/v1/role", Role);
app.use("/api/v1/role", Moderator);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
