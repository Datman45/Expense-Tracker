import { Router, Request } from "express";
import {
  createExpenseRequestBody,
  ExpenseResponseDto,
  updateExpenseRequestBody,
  UpdateExpenseResponseBody,
} from "../types";
import { ExpenseController } from "../controllers";
import { requireAuth } from "../middlewares/auth";

export class expensesRouter {
  static basePath = "/expenses";
  router: Router;
  constructor(private expenseController: ExpenseController) {
    this.router = Router();
    this.createGetAllExpenses();
    this.createCreateExpense();
    this.createGetExpenseBYId();
    this.createDeleteExpenseById();
    this.createUpdateExpenseById();
  }

  private createGetAllExpenses() {
    /**
     *  @openapi
     *  /expenses:
     *    summary: Operations about expenses
     *    get:
     *      tags:
     *        - expense
     *      summary: Get all expenses
     *      parameters:
     *        - in: query
     *          name: category
     *          schema:
     *            type: string
     *        - in: query
     *          name: minAmount
     *          schema:
     *            type: number
     *        - in: query
     *          name: maxAmount
     *          schema:
     *            type: number
     *        - in: query
     *          name: currency
     *          schema:
     *            type: string
     *        - in: query
     *          name: transactionType
     *          schema:
     *            type: string
     *            enum: [expense, income]
     *        - in: query
     *          name: fromDate
     *          schema:
     *            type: string
     *            format: date
     *        - in: query
     *          name: toDate
     *          schema:
     *            type: string
     *            format: date
     *      responses:
     *        "200":
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/expense'
     */

    this.router.get(
      "/",
      requireAuth,
      async (req: Request<{}, ExpenseResponseDto[]>, res) => {
        const userId = (req as any).user.id;
        res.send(await this.expenseController.getAllExpenses(userId));
      },
    );
  }

  private createCreateExpense() {
    /**
     * @openapi
     * /expenses:
     *     post:
     *       tags:
     *         - expense
     *       summary: Add an expense
     *       requestBody:
     *         description: structure of the expense
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/expenseCreate'
     *       responses:
     *        "201":
     *           description: Created
     *           content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/expense'
     */

    this.router.post(
      "/",
      requireAuth,
      async (
        req: Request<{}, ExpenseResponseDto, createExpenseRequestBody>,
        res,
      ) => {
        const userId = (req as any).user.id;
        res
          .status(201)
          .send(await this.expenseController.createExpense(req.body, userId));
      },
    );
  }

  private createGetExpenseBYId() {
    /**
     * @openapi
     * /expenses/{id}:
     *     summary: Operations with the expense id
     *     get:
     *       tags:
     *         - expense
     *       summary: Get an expense entry by ID
     *       parameters:
     *         - name: id
     *           in: path
     *           schema:
     *             type: integer
     *           required: true
     *           description: Numeric ID of the expense to get
     *       responses:
     *        "200":
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *                 $ref: '#/components/schemas/expense'
     */

    this.router.get(
      "/:id",
      requireAuth,
      async (req: Request<{ id: string }, ExpenseResponseDto>, res) => {
        const userId = (req as any).user.id;
        res.send(
          await this.expenseController.getExpenseById(
            Number(req.params.id),
            userId,
          ),
        );
      },
    );
  }

  createDeleteExpenseById() {
    /**
     *  @openapi
     *  /expenses/{id}:
     *    delete:
     *      tags:
     *        - expense
     *      summary: Delete an expense
     *      parameters:
     *        - name: id
     *          in: path
     *          schema:
     *            type: integer
     *          required: true
     *          description: Numeric ID of the expense to delete
     *      responses:
     *        "204":
     *         description: No Content
     */

    this.router.delete(
      "/:id",
      requireAuth,
      async (req: Request<{ id: string }>, res) => {
        const userId = (req as any).user.id;
        await this.expenseController.deleteExpenseById(
          Number(req.params.id),
          userId,
        );
        res.status(204).end();
      },
    );
  }

  private createUpdateExpenseById() {
    /**
     *   @openapi
     *  /expenses/{id}:
     *    put:
     *      tags:
     *        - expense
     *      summary: Update an expense
     *      parameters:
     *        - name: id
     *          in: path
     *          schema:
     *            type: integer
     *          required: true
     *          description: Numeric ID of the expense to update
     *      requestBody:
     *        description: structure of the expense
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/expenseUpdate'
     *      responses:
     *        "200":
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/expense'
     */

    this.router.put(
      "/:id",
      requireAuth,
      async (
        req: Request<
          { id: string },
          UpdateExpenseResponseBody,
          updateExpenseRequestBody
        >,
        res,
      ) => {
        const userId = (req as any).user.id;
        res.send(
          await this.expenseController.updateExpenseById(
            Number(req.params.id),
            req.body,
            userId,
          ),
        );
      },
    );
  }
}
