import * as Interfaces from "../db/interfaces";
import { DbModel } from "../db/connect";
import { Request, Response, NextFunction } from "express";
import * as Formidable from "formidable";

// export class Controller {
//   public static getOrganization(res, req) {
//     console.log(req.body);
//     // DbModel.setDefaults();
//     // res.json({ ex: true });
//   }
// }

export const Controller = {
  get: {
    getOrganization: async (req: Request, res: Response) => {
      let allOrganization = await DbModel.getOganization();
      res.json(allOrganization);
    },
    getDivisionById: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      let division = await DbModel.getDivisionById(id);
      if (division) {
        res.json(division);
      } else {
        res.json({ error: "Not found division in organization" });
      }
    },
    getEmployeeById: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      let division = await DbModel.getEmployeeById(id);
      if (division) {
        res.json(division);
      } else {
        res.json({ error: "Not found division in organization" });
      }
    }
  },
  post: {
    athorize: async (req: Request, res: Response) => {
      let user = await DbModel.getUser();
      let form = new Formidable.IncomingForm();
      form.parse(req, (err, fields: any) => {
        let { login, password } = fields.loginData;
        console.log(fields, user);
        if (login === user.login && password === user.password) {
          res.json({ isLogin: true });
        } else {
          res.json({ isLogin: false });
        }
      });
    }
  }
};
