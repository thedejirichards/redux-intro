import { applyMiddleware, combineReducers, createStore } from "redux";
import  {thunk}  from "redux-thunk";


import accountReducer from "./Features/account/AccountSlice";
import customerReducer from "./Features/customers/CustomerSlice";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store