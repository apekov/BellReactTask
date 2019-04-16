/**
 * Типы экшенов, используемые в приложении.
 * LOGIN - Авторизация.
 * LOGOUT - Отмена авторизации.
 * CLICK - Подсчёт чего-либо для примера.
 */
export enum ActionTypes {
  LOGIN = "ACTION_LOGIN",
  LOGOUT = "ACTION_LOGOUT",
  GET_ORGANIZATION = "GET_ORGANIZATION",
  GET_DIVISION = "GET_DIVISION",
  GET_EMPLOYEE = "GET_EMPLOYEE"
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
