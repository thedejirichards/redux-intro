export type InitialAccountStateType = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

export type AccountActionTypes =
  | { type: "account/deposit"; payload: {
    amount: number, currency: string
  } }
  | { type: "account/withdraw"; payload: number }
  | { type: "account/convertingCurrency"; }
  | {
      type: "account/requestLoan";
      payload: {
        amount: number;
        purpose: string;
      };
    }
  | { type: "account/payloan" };

export type InitialCustomerStateType = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};


export type CustomerActionTypes =
  | { type: "customer/createCustomer"; payload: {
    fullName: string,
    nationalID: string
    createdAt: string
  } }
  | {
    type: "customer/updateCustomer"; payload: string
  }

