import { IActionType, IDivision, IEmployee } from "../common";
import { ActionTypes, AsyncActionTypes } from "../Actions/Consts";

export interface IOrganizationItem {
  id: number;
  name: string;
  address: string;
  INN: number;
}

const organizationArray: IOrganizationItem[] = [];
const divisionArray: IDivision[] = [];
const employeeArray: IEmployee[] = [];

const initialState = {
  organization: organizationArray,
  division: divisionArray,
  employee: employeeArray,
  loading: false
};

export function organizationReducer(state = initialState, action: IActionType) {
  switch (action.type) {
    // Organization reducer
    case `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.SUCCESS}`:
      return {
        ...state,
        organization: action.payload,
        loading: false
      };

    case `${ActionTypes.GET_ORGANIZATION}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        organization: []
      };

    // Division reducer
    case `${ActionTypes.GET_DIVISION}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${ActionTypes.GET_DIVISION}${AsyncActionTypes.SUCCESS}`:
      console.log(action.payload);
      return {
        ...state,
        division: action.payload,
        loading: false
      };

    case `${ActionTypes.GET_DIVISION}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        division: []
      };

    // Employee reducer

    case `${ActionTypes.GET_EMPLOYEE}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${ActionTypes.GET_EMPLOYEE}${AsyncActionTypes.SUCCESS}`:
      return {
        ...state,
        employee: action.payload,
        loading: false
      };

    case `${ActionTypes.GET_EMPLOYEE}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        employee: []
      };
  }
  return state;
}
