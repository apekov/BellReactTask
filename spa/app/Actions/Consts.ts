/**
 * Типы экшенов, используемые в приложении.
 * LOGIN - Авторизация.
 * LOGOUT - Отмена авторизации.
 * CLICK - Подсчёт чего-либо для примера.
 */
export enum ActionTypes {
  LOGIN = "ACTION_LOGIN",
  LOGOUT = "ACTION_LOGOUT",
  ORGANIZATION = "ORGANIZATION",
  DIVISION = "DIVISION",
  EMPLOYEE = "EMPLOYEE"
}

export enum CrudTypes {
  CREATE = "CREATE_",
  DELETE = "DELETE_",
  GET = "GET_"
}

/**
 * Подтипы для экшенов при ассинхронной работы.
 * BEGIN - Начало ассинхронного действия.
 * SUCCESS - Действие завершилось успешно.
 * FAILURE - Действие завершилось с ошибкой.
 */
export enum AsyncActionTypes {
  BEGIN = "_BEGIN",
  SUCCESS = "_SUCCESS",
  FAILURE = "_FAILURE"
}
