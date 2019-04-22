import * as Interfaces from "../db/interfaces";
import { DbModel } from "../db/connect";
import { Request, Response, NextFunction } from "express";
import * as Formidable from "formidable";
import { parse } from "querystring";

export const Controller = {
  get: {
    getOrganization: async (req: Request, res: Response) => {
      let allOrganization = await DbModel.getOganization();
      res.json(allOrganization);
    },
    getDivisionById: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      // console.log(req.query);
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
    },
    CreateOrganization: async (req: Request, res: Response) => {
      let form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields: any) => {
        let callback = await DbModel.addOrganization({
          id: 111,
          ...fields,
          INN: Number.parseInt(fields.INN, 10)
        });
        if (callback) {
          res.json({ success: true });
        }
      });
    },
    CreateDivision: async (req: Request, res: Response) => {
      let form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields: any) => {
        let callback = await DbModel.addDivision({
          id: 111,
          ...fields,
          id_organization: Number.parseInt(fields.id_organization, 10)
        });
        if (callback) {
          res.json({ success: true });
        }
      });
    },
    CreateEmployee: async (req: Request, res: Response) => {
      let form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields: any) => {
        let callback = await DbModel.addEmployee({
          id: 111,
          ...fields,
          id_division: Number.parseInt(fields.id_division, 10)
        });
        if (callback) {
          res.json({ success: true });
        }
      });
    }
  },

  delete: {
    DeleteOrganization: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      console.log(req.params);
      let deleted = await DbModel.deleteEsense(id, "organization");
      res.json({ id: id });
    },
    DeleteDivision: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      console.log(req.params);
      let deleted = await DbModel.deleteEsense(id, "division");
      res.json({ id: id });
    },
    DeleteEmployee: async (req: Request, res: Response) => {
      let id = Number(req.query.id);
      console.log(req.params);
      let deleted = await DbModel.deleteEsense(id, "employee");
      res.json({ id: id });
    }
  },
  put: {
    editOrganization: async (req: Request, res: Response) => {
      let form = new Formidable.IncomingForm();
      form.parse(req, async (err, fields: any) => {
        const id = parseInt(fields.id, 10);
        let edited = await DbModel.editEsense(id, "organization", {
          name: fields.name,
          address: fields.address,
          INN: fields.INN
        });
        if (edited) {
          res.json(edited);
        }
      });
    }
  }
};
