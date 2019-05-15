import {
  IActionType,
  IDivision,
  IEmployee,
  IOrganizationItem
} from "../common";
import { ActionTypes, AsyncActionTypes, CrudTypes } from "../Actions/Consts";

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
    case `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${
      AsyncActionTypes.SUCCESS
    }`:
      return {
        ...state,
        organization: action.payload,
        loading: false
      };

    case `${CrudTypes.GET}${ActionTypes.ORGANIZATION}${
      AsyncActionTypes.FAILURE
    }`:
      return {
        ...state,
        loading: false,
        organization: []
      };

    // Division reducer
    case `${CrudTypes.GET}${ActionTypes.DIVISION}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${CrudTypes.GET}${ActionTypes.DIVISION}${AsyncActionTypes.SUCCESS}`:
      console.log(action.payload);
      return {
        ...state,
        division: action.payload,
        loading: false
      };

    case `${CrudTypes.GET}${ActionTypes.DIVISION}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        division: []
      };

    // Employee reducer

    case `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${AsyncActionTypes.BEGIN}`:
      return {
        ...state,
        loading: true
      };

    case `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${AsyncActionTypes.SUCCESS}`:
      return {
        ...state,
        employee: action.payload,
        loading: false
      };

    case `${CrudTypes.GET}${ActionTypes.EMPLOYEE}${AsyncActionTypes.FAILURE}`:
      return {
        ...state,
        loading: false,
        employee: []
      };
  }
  return state;
}
