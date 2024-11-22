const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const BookRouter = require("./app/routes/book.route");
const UserRouter = require("./app/routes/user.route");
const PublisherRouter = require("./app/routes/publisher.route");
const StaffRouter = require("./app/routes/staff.route");
const BookTrackingRouter = require("./app/routes/book-tracking.route");


const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

app.use("/api/user", UserRouter);
app.use("/api/book", BookRouter);
app.use("/api/publisher", PublisherRouter);
app.use("/api/staff", StaffRouter);
app.use("/api/track", BookTrackingRouter);



app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;