import { Router } from "express";
import { getUserPolicy } from "../controller/user";

const routes = new Router();

routes.get("/user", getUserPolicy);

export default routes;
