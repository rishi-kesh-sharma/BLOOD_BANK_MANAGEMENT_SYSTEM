const express = require("express");
// const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// const methodOverride = require("method-override");

// routers
const {
  authRouter,
  bankRouter,
  contactRouter,
  miscRouter,
  userRouter,
} = require("./routes");
const {
  errorMiddlware,
  authMiddleWare: { authorizeRoles, isAuthenticatedUser, isAuthorizedUser },
  catchAsyncErrorsMiddleware,
} = require("./middlewares");

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the sever due to uncaught exception `);
  process.exit(1);
});

const app = express();

//ERROR MIDDLEWARE
app.use(errorMiddlware);

//CONFIGURE DOTENV
dotenv.config({ path: "./config.env" });
//static files

// moment configuration
var moment = require("moment");
var shortDateFormat = "ddd @ h:mmA";
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

//using static files
// const staticPath = path.join(__dirname, "./static");
// app.use(express.static(staticPath));
const PORT = process.env.PORT || 4000;

//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(
//   methodOverride(function (req, res) {
//     if (req.body && typeof req.body === "object" && "_method" in req.body) {
//       var method = req.body._method;
//       delete req.body._method;
//       return method;
//     }
//   })
// );
app.use(express.json());

// cors

app.use(cors());
app.use(cookieParser());

//database connection
require("./database/conn");

//all the routes

app.use("/api/auth", authRouter);
app.use("/api/user", isAuthenticatedUser, userRouter);
// app.use("/api/appointment", isAuthenticatedUser, appointmentRouter);
app.use("/api/bank", bankRouter);
app.use("/api/contact", isAuthenticatedUser, contactRouter);
app.use("/api", isAuthenticatedUser, miscRouter);

//listening to the server

// action routes

app.listen(PORT, () => {
  console.log("server running in port " + PORT);
});

// handling unhandled rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the sever due to unhandled promise  rejection `);
  app.close(() => {
    process.exit(1);
  });
});
