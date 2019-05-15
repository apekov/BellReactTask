import { Action } from "redux";

/**
 * Вид используемых экшенов.
 * @prop {string} type Тип экшена.
 * @prop {any} [payload] Дополнительная информация для экшена.
 */
export interface IActionType extends Action {
  type: string;
  payload?: any;
}

/**
 * Модель данных для авторизации.
 * @prop {string} name Имя пользователя.
 * @prop {string} password Пароль пользователя.
 */
export interface ILoginData {
  login: string;
  password: string;
}

export interface ILoginState {
  loginStatus: boolean;
  loading: boolean;
}
// Организации
export interface IOrganizationItem {
  id: number;
  name: string;
  address: string;
  INN: number;
}
// Подразделение
export interface IDivision {
  id: number;
  id_organization: number;
  name: string;
  phone: number;
}

// Сотрудник
export interface IEmployee {
  id: number;
  id_division: number;
  FIO: string;
  address: string;
  position: string;
}

export interface IStateComponent {
  confirmOpen: boolean;
  modalOpen: boolean;
  editOpen: boolean;
  delatedId: string;
  editedId: string;
  completed: boolean;
}
