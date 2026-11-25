
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

app.use(
    session({
        secret: "cmpt315_project",
        resave: false,
        saveUninitialized: false,
    })
);



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 