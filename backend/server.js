const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run defaults to 8080

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const uri = process.env.MONGODB_URI; // safer than hardcoding
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");

        const db = client.db("Ghastly");
        const recommendations = db.collection("Recommendations");

        // --- API endpoint: fetch recommendations by tier ---
        app.get("/api/recommendations", async (req, res) => {
            const { tier } = req.query;
            try {
                const results = await recommendations
                    .find({ tier: Number(tier) })
                    .toArray();
                res.json(results);
            } catch (err) {
                console.error("❌ Error fetching recommendations:", err);
                res.status(500).json({ error: err.message });
            }
        });

        // --- Serve React frontend ---
        const buildPath = path.join(__dirname, "../frontend/build");
        app.use(express.static(buildPath));

        // Catch-all: React handles client-side routes
        app.get("*", (req, res) => {
            res.sendFile(path.join(buildPath, "index.html"));
        });

        // --- Start server ---
        app.listen(PORT, "0.0.0.0", () => {  // listen on all interfaces for Cloud Run
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1); // crash container if DB connection fails
    }
}

run().catch(console.dir);
