import Axios from "axios";
import { Dispatch } from "redux";
import { IActionType } from "../common";
import { ActionTypes, AsyncActionTypes } from "./Consts";
import { ILoginData } from "./Models";

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
      type: `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.BEGIN}`
    });
    Axios.get(`http://localhost:8080/organization`)
      .then(res => {
        if (res.data) {
          this.dispatch({
            type: `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.SUCCESS}`,
            payload: res.data
          });
        } else {
          throw "error";
        }
      })
      .catch(error => {
        this.dispatch({
          type: `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.FAILURE}`,
          payload: error
        });
      });
  };

  getDivisionByIdOrganization = (id: number) => {
    this.dispatch({
      type: `${ActionTypes.GET_DIVISION}${AsyncActionTypes.BEGIN}`
    });
    Axios.get(`http://localhost:8080/division?id=${id}`, {
      params: { id: id }
    })
      .then(result => {
        if (result.status === 200) {
          console.log(result);
          this.dispatch({
            type: `${ActionTypes.GET_DIVISION}${AsyncActionTypes.SUCCESS}`,
            payload: result.data
          });
        }
      })
      .catch(err => {
        this.dispatch({
          type: `${ActionTypes.GET_DIVISION}${AsyncActionTypes.FAILURE}`,
          payload: err
        });
      });
  };
}
