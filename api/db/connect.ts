import * as lowDb from "lowdb";
import * as FyleSync from "lowdb/adapters/FileSync";

import * as dbInterface from "./interfaces";

const db = lowDb(new FyleSync("./db/db.json"));

export class DbModel {
  public static async setDefaults() {
    let result = await db
      .defaults({
        user: { login: "alan", password: 123 },
        organization: [],
        division: [],
        employee: []
      })
      .write();
    return result;
  }
  public static async getUser() {
    const users = await db.get("user").value();
    return users;
  }

  public static async getOganization() {
    let result = await db.get("organization");
    return result;
  }

  public static async addOganization(data: dbInterface.IOrganization) {
    await db
      .get("organization")
      .push({
        id: data.id,
        name: data.name,
        address: data.address,
        INN: data.INN
      })
      .write();
  }

  public static async getDivisionById(id: number) {
    let result = await db
      .get("division")
      .filter({ id_organization: id })
      .value();
    return result;
  }

  public static async addDivision(data: dbInterface.IDivision) {
    await db
      .get("division")
      .push({
        id: data.id,
        id_organization: data.id_organization,
        name: data.name,
        phone: data.phone
      })
      .write();
  }

  public static async getEmployeeById(id: number) {
    let result = await db
      .get("employee")
      .filter({ id_division: id })
      .value();
    return result;
  }

  public static async addEmployee(data: dbInterface.IEmployee) {
    await db
      .get("employee")
      .push({
        id: data.id,
        id_division: data.id_division,
        FIO: data.FIO,
        address: data.address,
        position: data.position
      })
      .write();
  }
}
