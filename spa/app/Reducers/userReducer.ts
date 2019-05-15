import { IActionType } from "../common";
import { ActionTypes, AsyncActionTypes } from "../Actions/Consts";

/**
 * Состояние для Redux хранилища (стора).
 * @prop {boolean} loginStatus Состояние зарегистрированности пользователя.
 * @prop {boolean} loading Ожидание завершения процедуры авторизации (завершение логина).
 * @prop {boolean} counter Результат вычисления.
 * @prop {boolean} counterIsLoading Выполнение вычисления.
 */
interface IStoreState {
  loginStatus: boolean;
  loading: boolean;
}

/**
 * Начальное состояние стора.
 */
const initialState: IStoreState = {
  loginStatus: false,
  loading: false
};

export function userReducer(state = initialState, action: IActionType) {
  switch (action.type) {
    case `${ActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`:
      return {
        ...state,
        loginStatus: true,
        loading: false
      };

    case `${ActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        loginStatus: false
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        loginStatus: false
      };
  }
  return state;
}
