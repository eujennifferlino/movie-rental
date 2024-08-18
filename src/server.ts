import "express-async-errors"
import express from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppErrors";

const app = express();

app.use(express.json());
app.use(routes);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3333, () => console.log("Servidor está rodando! 🚀🚀"));
