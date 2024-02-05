const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const commanderRoutes = require("./routes/commanderRoutes.js");
const charterRoutes = require("./routes/charterRoutes.js");
const authRoutes = require("./routes/authRoutes.js")

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/commanders", commanderRoutes);
app.use("/api/charters", charterRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
