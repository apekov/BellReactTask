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

routes.post("/createOrganization", Controller.post.CreateOrganization);
routes.post("/createDivision", Controller.post.CreateDivision);
routes.post("/createEmployee", Controller.post.CreateEmployee);

routes.delete("/deleteOrganization", Controller.delete.DeleteOrganization);
routes.delete("/deleteDivision", Controller.delete.DeleteDivision);
routes.delete("/deleteEmployee", Controller.delete.DeleteEmployee);

routes.put("/editOrganization", Controller.put.editOrganization);

export default routes;
