const express = require("express");
const router = express.Router();

const db = require("./database");

// =============================
// GET ALL WATER INTAKE
// =============================
router.get("/intake", (req, res) => {

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

// =============================
// ADD WATER INTAKE
// =============================
router.post("/intake", (req, res) => {

    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({
            success: false,
            message: "Water amount is required."
        });
    }

    const sql = `
        INSERT INTO water_intake
        (amount, created_at)
        VALUES
        (?, datetime('now'))
    `;

    db.run(sql, [amount], function (err) {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Water intake added successfully.",
            id: this.lastID
        });

    });

});

// =============================
// GET SETTINGS
// =============================
router.get("/settings", (req, res) => {

    const sql = "SELECT * FROM settings WHERE id = 1";

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

// =============================
// UPDATE SETTINGS
// =============================
router.post("/settings", (req, res) => {

    const { interval, goal } = req.body;

    const sql = `
        UPDATE settings
        SET reminder_interval = ?,
            daily_goal = ?
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
            message: "Settings updated successfully."
        });

    });

});

// =============================
// DELETE WATER RECORD
// =============================
router.delete("/intake/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM water_intake WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Record deleted successfully."
            });

        }
    );

});

module.exports = router;