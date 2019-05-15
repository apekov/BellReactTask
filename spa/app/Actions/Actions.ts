import Axios from "axios";
import { Dispatch } from "redux";
import { IActionType, ILoginData } from "../common";
import { ActionTypes, AsyncActionTypes, CrudTypes } from "./Consts";

/**
 * Экшены для приложения.
 */
export class Actions {
  constructor(private dispatch: Dispatch<IActionType>) {}
  onLogin = (loginData: ILoginData) => {
    this.dispatch({ type: `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}` });

    Axios.post(`http://localhost:8080/athorize`, { loginData })
      .then(res => {
        if (res.data.isLogin) {
          this.dispatch({
            type: `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`
          });
        } else {
          throw "error";
        }
      })
      .catch(error => {
        this.dispatch({
          type: `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`,
          payload: error
        });
      });
  };

  onLogout = () => {
    this.dispatch({ type: ActionTypes.LOGOUT });
  };

  getOrganizations = () => {
    this.dispatch({
      type: `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${
        AsyncActionTypes.BEGIN
      }`
    });
    Axios.get(`http://localhost:8080/organization`)
      .then(res => {
        if (res.data) {
          this.dispatch({
            type: `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${
              AsyncActionTypes.SUCCESS
            }`,
            payload: res.data
          });
        } else {
          throw "error";
        }
      })
      .catch(error => {
        this.dispatch({
          type: `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${
            AsyncActionTypes.FAILURE
          }`,
          payload: error
        });
      });
  };

  addOrganization = (data: any) => {
    Axios.post(`http://localhost:8080/createOrganization`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess add organization");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  deleteOrganization = (id: string) => {
    Axios.delete(`http://localhost:8080/deleteOrganization?id=${id}`)
      .then(res => {
        if (res.data) {
          console.log("sucess delete organization");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  editOrganization = (data: any) => {
    Axios.put(`http://localhost:8080/editOrganization`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess edit organization");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  getDivisionByIdOrganization = (id: number) => {
    this.dispatch({
      type: `${CrudTypes.GET}${ActionTypes.DIVISION}${AsyncActionTypes.BEGIN}`
    });
    Axios.get(`http://localhost:8080/division?id=${id}`)
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          this.dispatch({
            type: `${CrudTypes.GET}${ActionTypes.DIVISION}${
              AsyncActionTypes.SUCCESS
            }`,
            payload: result.data
          });
        }
      })
      .catch(err => {
        this.dispatch({
          type: `${CrudTypes.GET}${ActionTypes.DIVISION}${
            AsyncActionTypes.FAILURE
          }`,
          payload: err
        });
      });
  };

  addDivision = (data: any) => {
    Axios.post(`http://localhost:8080/createDivision`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess add division");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  deleteDivision = (id: string) => {
    Axios.delete(`http://localhost:8080/deleteDivision?id=${id}`)
      .then(res => {
        if (res.data) {
          console.log("sucess delete Division");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  editDivision = (data: any) => {
    Axios.put(`http://localhost:8080/editDivision`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess edit Division");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  getEmployeeByIdDivision = (id: number) => {
    this.dispatch({
      type: `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${AsyncActionTypes.BEGIN}`
    });
    Axios.get(`http://localhost:8080/employee?id=${id}`)
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          this.dispatch({
            type: `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${
              AsyncActionTypes.SUCCESS
            }`,
            payload: result.data
          });
        }
      })
      .catch(err => {
        this.dispatch({
          type: `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${
            AsyncActionTypes.FAILURE
          }`,
          payload: err
        });
      });
  };

  addEmployee = (data: any) => {
    console.log(data);
    Axios.post(`http://localhost:8080/createEmployee`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess add employee");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  deleteEmployee = (id: string) => {
    Axios.delete(`http://localhost:8080/deleteEmployee?id=${id}`)
      .then(res => {
        if (res.data) {
          console.log("sucess delete Employee");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  editEmployee = (data: any) => {
    Axios.put(`http://localhost:8080/editEmployee`, data)
      .then(res => {
        if (res.data) {
          console.log("sucess edit Employee");
        } else {
          throw "error";
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}
