import type { AppDispatch, 
  // RootState 
} from "../../Store";
import type {
  AccountActionTypes,
  InitialAccountStateType,
} from "../../types/types";



const InitialAccountState: InitialAccountStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountReducer = (
  state = InitialAccountState,
  action: AccountActionTypes
) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload.amount, isLoading: false };
    case "account/convertingCurrency":
      return { ...state, isLoading: true};
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
export default accountReducer;

export const deposit = (amount: number, currency: string) => {
  if (currency === "USD")
    return { type: "account/deposit", payload: { amount, currency } };

  return function (dispatch: AppDispatch, 
    // getState: () => RootState
  ) {
    dispatch({type: "account/convertingCurrenct"})
    const convert = async (from: string, to: string, amount: number) => {
      const resp = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      const data = await resp.json()
      const convertedAmount =  Number((amount * data.rates[to]).toFixed(2));
      console.log(currency, amount, data, convertedAmount)
      dispatch ({ type: "account/deposit", payload: { amount: convertedAmount, currency }} );
    };
    convert(currency, "USD", amount);
  };
};

export const withdraw = (amount: number) => {
  return { type: "account/withdraw", payload: amount };
};

export const requestLoan = (amount: number, purpose: string) => {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
};

export const payLoan = () => {
  return { type: "account/payloan" };
};
