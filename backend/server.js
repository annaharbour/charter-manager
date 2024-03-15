const path = require('path')
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const commanderRoutes = require("./routes/commanderRoutes.js");
const charterRoutes = require("./routes/charterRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/commanders", commanderRoutes);
app.use("/api/charters", charterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));



app.listen(port, () => console.log(`Server running on port ${port}`));
