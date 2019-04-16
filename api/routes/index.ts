import * as express from "express";
import { Controller } from "../controller";

// export class Router {
//   public static _router: ExpressRouter = ExpressRouter();
//   public static get routes() {
//     this._router.get("/organization", Controller.getOrganization);
//     return this._router;
//   }
// }
const routes = express.Router();

routes.get("/organization", Controller.get.getOrganization);
routes.get("/division", Controller.get.getDivisionById);
routes.get("/employee", Controller.get.getEmployeeById);
routes.post("/athorize", Controller.post.athorize);

export default routes;
