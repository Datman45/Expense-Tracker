import { Router, Request } from "express";
import { validateLoginRequest } from "../../middlewares/login";
import { LoginRequestBody } from "../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { LoginController } from "../../controllers/account/login";

export class LoginRouter {
  static basePath = "/account/login";
  router: Router;
  constructor(private loginController: LoginController) {
    this.router = Router();
    this.createFindUserByUsername();
  }

  private createFindUserByUsername() {
    /**
     * @openapi
     * /account/login:
     *     description: Operations about account login
     *     post:
     *       tags:
     *         - account
     *       summary: Login into an account
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/login'
     *       responses:
     *         "200":
     *            description: OK
     *            content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/authResponse'
     *         "401":
     *            description: Unathorized
     *            content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   error:
     *                     type: string
     */

    this.router.post(
      "/",
      validateLoginRequest,
      async (req: Request<{}, any, LoginRequestBody>, res) => {
        const user = await this.loginController.findUserByUsername(req.body);

        if (!user) {
          return res
            .status(401)
            .send({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(
          req.body.password,
          user.passwordHash,
        );

        if (!isMatch) {
          return res.status(401).send({ error: "Invalid password" });
        }

        const token = generateToken(String(user.id));

        res.send({
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
