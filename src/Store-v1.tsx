import { combineReducers, createStore } from "redux";

import type {
  AccountActionTypes,
  CustomerActionTypes,
  InitialAccountStateType,
  InitialCustomerStateType,
} from "./types/types";

const InitialAccountState: InitialAccountStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountReducer = (
  state = InitialAccountState,
  action: AccountActionTypes
) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: state.loan + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payloan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
};

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
    default:
        return state
  }
};




const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

const deposit = (amount: number) => {
  store.dispatch({ type: "account/deposit", payload: amount });
};

deposit(500);
console.log(store.getState());
const withdraw = (amount: number) => {
  store.dispatch({ type: "account/withdraw", payload: amount });
};
withdraw(200);
console.log(store.getState());
const requestLoan = (amount: number, purpose: string) => {
  store.dispatch({
    type: "account/requestLoan",
    payload: { amount, purpose },
  });
};
requestLoan(1000, "Car purchase");
console.log(store.getState());

const payLoan = () => {
  store.dispatch({ type: "account/payloan" });
};
payLoan();
console.log(store.getState());



const createCustomer = (fullName: string, nationalID: string) => {
  store.dispatch({
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  });
};

createCustomer("Richard Oladeji", "4194542524")
console.log(store.getState().customer)