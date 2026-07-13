const sqlite3 = require("sqlite3").verbose();

// Create or Open Database
const db = new sqlite3.Database("./water.db", (err) => {
    if (err) {
        console.error("Database Connection Error:", err.message);
    } else {
        console.log("Connected to SQLite Database.");
    }
});

// ============================
// Create Water Intake Table
// ============================
db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS water_intake (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount INTEGER NOT NULL,
            created_at TEXT NOT NULL
        )
    `);

    // ============================
    // Create Settings Table
    // ============================
    db.run(`
        CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY,
            reminder_interval INTEGER NOT NULL,
            daily_goal INTEGER NOT NULL
        )
    `);

    // ============================
    // Insert Default Settings
    // ============================
    db.get("SELECT * FROM settings WHERE id = 1", (err, row) => {

        if (!row) {

            db.run(`
                INSERT INTO settings
                (id, reminder_interval, daily_goal)
                VALUES
                (1, 30, 3000)
            `);

        }

    });

});

module.exports = db;