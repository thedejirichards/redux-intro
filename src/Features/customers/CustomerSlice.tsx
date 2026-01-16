import type { CustomerActionTypes, InitialCustomerStateType } from "../../types/types";

const InitialCustomerState: InitialCustomerStateType = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};



const customerReducer = (
  state = InitialCustomerState,
  action: CustomerActionTypes
) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      };
    case "customer/updateCustomer":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
        return state
  }
};
export default customerReducer



export const createCustomer = (fullName: string, nationalID: string) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

export const updateCustomer = (prevName: string, newName: string) => {
  return {
    type: "customer/updateCustomer",
    payload: { newName },
  };
};

