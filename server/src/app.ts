import express from "express";
import passport from "passport";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import stateRoutes from "./routes/stateRoutes";
import userRoutes from "./routes/userRoutes";
import authMiddleware from "./middleware/authMiddleware";
import db from "./config/db";

const app = express();

app.use(express.json());

db();

app.use(session({ secret: "123", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(stateRoutes);
app.use(userRoutes);

app.use(authMiddleware);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send({ error: err.message });
});

export default app;
