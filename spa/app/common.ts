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
    editOpen: boolean,
    delatedId: string,
    editedId: string,
    completed: boolean,
}