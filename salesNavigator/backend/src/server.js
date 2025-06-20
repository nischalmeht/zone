const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./lib/db");
const routes = require("./routes/sale-routes")
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: 'http://localhost:5173',  // your frontend URL
	credentials: true,                 // if sending cookies or auth headers
  }));
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
app.use("/api/routes" , routes);
app.listen(PORT, function() {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});