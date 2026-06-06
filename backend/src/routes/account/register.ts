import { Request, Router } from "express";
import { validateRegisterRequest } from "../../middlewares/register";
import { RegisterRequestBody } from "../../types";
import jwt from "jsonwebtoken";
import { RegisterController } from "../../controllers";

export class RegisterRouter {
  static basePath = "/account/register";
  router: Router;
  constructor(private registerController: RegisterController) {
    this.router = Router();
    this.createCreateUser();
  }
  private createCreateUser() {
    /**
     * @openapi
     * /account/register:
     *   summary: Operations about account registration
     *   post:
     *     tags:
     *       - account
     *     summary: Register a new account
     *     requestBody:
     *       description: structure of the register
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/register'
     *     responses:
     *      "201":
     *         description: Created
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/authResponse'
     *      "409":
     *         description: Created
     *         content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     */

    this.router.post(
      "/",
      validateRegisterRequest,
      async (req: Request<{}, any, RegisterRequestBody>, res) => {
        const user = await this.registerController.createUser(req.body);

        if (!user) {
          return res
            .status(409)
            .send({ error: "User with this username already exists" });
        }

        const token = generateToken(String(user.id));

        return res.status(201).send({
          token,
          user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      },
    );
  }
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
