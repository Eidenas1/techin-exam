const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const booksRoutes = require("./routes/booksRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server ok");
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', booksRoutes);
app.use('/api/v1/admin', userRoutes);
module.exports = app;
