import express, {Request, Response, NextFunction} from "express";
import { sequelize } from "./sequlize";
import userRouter  from "./routers/userRouter"; 
import dotenv from 'dotenv';
import { errorHandleMiddleWare } from "./middleware/ErrorhandleMiddleware";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json());

app.use("/users", userRouter); 

app.use(errorHandleMiddleWare);



sequelize.sync({ force: false   }) // Change to `true` to reset tables (use with caution)
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));