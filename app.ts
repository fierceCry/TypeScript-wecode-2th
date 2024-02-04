import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express, { Request, Response} from "express";

import { connectToMongoDB } from "./src/models/dataSource";
import { routes } from './src/routes';
import { globalErrorHandler } from './src/utils/error';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);
app.use(globalErrorHandler);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

const startServer = async (): Promise<void> => {
  const PORT = process.env.PORT || 3000;

  await connectToMongoDB;

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
