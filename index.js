const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
let _http = require("http");

const app = express();

//connect database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
//enable cors
app.use(cors());

// Define Routes
app.use("/api/users", require("./routes/api/userController"));
app.use("/api/auth", require("./routes/api/authController"));
app.use("/api/batchFile", require("./routes/api/batchFileController"));

const PORT = process.env.PORT || 5000;

/**
 * frontend file Angular
 */
const path = require("path");

app.use(express.static(path.join(__dirname, "filemanagement-poc/browser")));

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/filemanagement-poc/browser/index.html`);
});

let httpServer = _http.createServer(app);
httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
