import express from "express";
import mongoose, { connect } from "mongoose"
import dotenv from "dotenv";
import connecDB from "./src/config/db.mjs";
import projectRoutes from "./src/routes/projectRoutes.mjs"
import Project from "./src/models/Project.mjs";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

connecDB();
app.use(cors({
     origin: ["http://localhost:5173","http://localhost:5174","https://portfolio-paranthaman-frontend.vercel.app/"
    ]
    }));
app.use('/api', projectRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get('/', (req, res)=>{
    res.send("API WORKING..");
});

app.listen(PORT, ()=>{
 console.log(`Server is starting on PORT ${PORT}`);
})

