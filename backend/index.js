import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import { connectDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // connect MongoDB

app.use("/api/users", userRoutes); // mount user routes

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend running on port ${port}`));
