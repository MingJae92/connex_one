
import promMid from "express-prometheus-middleware";
import cors from "cors";
import express from "express"

const app = express();

app.use(cors());

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    authenticate: (req) => req.headers.authorization === "mysecrettoken",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, _res, next) {
  if (req.headers.authorization !== "mysecrettoken") {
    next(createError(403));
  }
  next();
});

app.use("/time", (res, req, next)=>{
  const serverTimeSeconds = new Date().getTime() / 1000;
  res.send({
    epoch: serverTimeSeconds
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

