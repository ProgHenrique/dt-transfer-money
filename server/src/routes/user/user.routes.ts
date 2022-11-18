import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticate";
import { setBalance } from "../../middlewares/setBalance";
import { AuthenticateUserInicialize } from "../../modules/users/useCases/authenticateUser";
import { CreateUserInicialize } from "../../modules/users/useCases/createUser";
import { UserBalanceInicialize } from "../../modules/users/useCases/userBalance";


export const userRoutes = Router()

const createUserController = CreateUserInicialize()
const userBalanceController = UserBalanceInicialize()
const authenticateUserController = AuthenticateUserInicialize()


userRoutes.post("/create", (request, response) => createUserController.handle(request, response))
userRoutes.get("/balance", ensureAuthenticated, setBalance, (request, response) => userBalanceController.handle(request, response))
userRoutes.post("/authenticate", (request, response) => authenticateUserController.handle(request, response))