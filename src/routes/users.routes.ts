import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import AuthenticateUserController from "../modules/users/controllers/AuthenticateUserController";
import CreateUserController from "../modules/users/controllers/CreateUserController";
import RefreshTokenUserController from "../modules/users/controllers/RefreshTokenUserController";

const userRouter = Router();

userRouter.post("/users", new CreateUserController().handle);
userRouter.post("/login", new AuthenticateUserController().handle);
userRouter.post("/refresh-token", new RefreshTokenUserController().handle);

userRouter.get("/courses", ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: "NodeJS"},
    { id: 2, name: "Flask"},
    { id: 3, name: "Elixir"},
    { id: 4, name: "Ruby on Rails"},
    { id: 5, name: "ReactJS"},
  ]);
})


export default userRouter;
