const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./database");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// GET Today's Water Intake
// ==============================
app.get("/api/intake", (req, res) => {

    const sql = "SELECT * FROM water_intake ORDER BY id DESC";

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(rows);

    });

});

// ==============================
// ADD Water Intake
// ==============================
app.post("/api/intake", (req, res) => {

    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({
            success: false,
            message: "Amount is required"
        });
    }

    const sql =
        "INSERT INTO water_intake(amount, created_at) VALUES(?, datetime('now'))";

    db.run(sql, [amount], function (err) {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Water intake added successfully",
            id: this.lastID
        });

    });

});

// ==============================
// GET Settings
// ==============================
app.get("/api/settings", (req, res) => {

    const sql = "SELECT * FROM settings LIMIT 1";

    db.get(sql, [], (err, row) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(row);

    });

});

// ==============================
// SAVE Reminder Settings
// ==============================
app.post("/api/settings", (req, res) => {

    const { interval, goal } = req.body;

    const sql = `
    UPDATE settings
    SET reminder_interval = ?, daily_goal = ?
    WHERE id = 1
    `;

    db.run(sql, [interval, goal], function (err) {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Settings Updated Successfully"
        });

    });

});

// ==============================
// Home Route
// ==============================
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => {

    console.log("==================================");
    console.log(" Water Reminder Server Started ");
    console.log("==================================");
    console.log(`Server Running : http://localhost:${PORT}`);

});