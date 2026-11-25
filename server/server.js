
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { getOne, run } = require("./postgres");
const bcrypt = require("bcrypt");


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
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
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: "Authentication required" });
    }
    next();
}


// ==========================================
// 1. Login/Authentication Routes
// ==========================================

function isValidUsername(username) {
    return (
        typeof username === "string" &&
        /^[A-Za-z0-9]{3,20}$/.test(username)
    );
}
function isValidPassword(password) {
    return (
        typeof password === "string" &&
        password.length >= 6 &&
        /[A-Za-z]/.test(password) &&
        /[0-9]/.test(password)
    );
}

app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!isValidUsername(username)) {
            return res.status(400).json({ message: "Invalid username" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const existingUser = await getOne("SELECT * FROM users WHERE username = $1", [username]);
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await run("INSERT INTO users (username, password_hash) VALUES ($1, $2)", [username, passwordHash]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/login", async (req, res) => {
    try{
        const { username, password } = req.body;

        if (!isValidUsername(username) || !isValidPassword(password)) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const user = await getOne("SELECT * FROM users WHERE username = $1", [username]);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const {id, password_hash, role, created_at} = user;
        const passwordMatches = await bcrypt.compare(password, password_hash);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        req.session.user = {
            id: id,
            username: username,
            role: role,
            created_at: created_at,
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/api/logout", requireLogin, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(204).send();
    });
});
app.get("/api/me", requireLogin, (req, res) => {
    res.json(req.session.user);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 