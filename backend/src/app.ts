import Express = require("express");
import { apidocsRouter } from "./routes";
import {
  addTimeStamp,
  errorHandler,
  logger,
  openApiValidator,
} from "./middlewares";
import { ExpenseDao, LoginDao, PostgresExpenseDao } from "./dao";
import { ExpenseController, RegisterController } from "./controllers";
import { expensesRouter } from "./routes/expenses";
import dotenv from "dotenv";
import cors from "cors";
import { RegisterDao } from "./dao/account/register";
import { PostgresRegisterDao } from "./dao/account/register/postgresRegisterDao";
import { PostgresLoginDao } from "./dao/account/login/postgresLoginDao";
import { LoginController } from "./controllers/account/login";
import { LoginRouter } from "./routes/account/login";
import { RegisterRouter } from "./routes/account/register";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
  }),
);
app.use(addTimeStamp);
app.use(logger);
app.use(openApiValidator);

const expenseDao: ExpenseDao = new PostgresExpenseDao();
const expenseController = new ExpenseController(expenseDao);
const expenseRouter = new expensesRouter(expenseController);

const registerDao: RegisterDao = new PostgresRegisterDao();
const registerController = new RegisterController(registerDao);
const registerRouter = new RegisterRouter(registerController);

const loginDao: LoginDao = new PostgresLoginDao();
const loginController = new LoginController(loginDao);
const loginRouter = new LoginRouter(loginController);

app.use("/api-docs", apidocsRouter);
app.use(expensesRouter.basePath, expenseRouter.router);
app.use(RegisterRouter.basePath, registerRouter.router);
app.use(LoginRouter.basePath, loginRouter.router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
