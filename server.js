import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/users", usersRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, _, res, __) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost: ${PORT}`)
);
