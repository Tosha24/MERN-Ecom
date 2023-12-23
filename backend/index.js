import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)
app.use("/api/upload", uploadRoutes)

const __dirname = path.resolve()    // resolve() method returns an absolute path of the current working directory.
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))    // This line of code makes the uploads folder static so that it can be accessed from the browser, in other words it means that the uploads folder is publicly available to the browser. Path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.

app.listen(port, () => console.log(`Server running on port ${port}`))
