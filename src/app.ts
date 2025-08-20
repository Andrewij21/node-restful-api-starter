import cors from "cors";
import express from "express";
import routes from "@/routes/index.route";
import { errorHandler } from "@/middlewares/errorHandler";
import { corsOptions } from "./config/cors";
import helmet from "helmet";
import compression from "compression";

export const app = express();

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);
