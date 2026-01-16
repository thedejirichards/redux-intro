import CreateCustomer from "./Features/customers/CreateCustomer";
import Customer from "./Features/customers/Customer";
import AccountOperations from "./Features/account/AccountOperations";
import BalanceDisplay from "./Features/account/BalanceDisplay";
import { useSelector } from "react-redux";
import type { RootState } from "./Store";

function App() {
  const fullName = useSelector((store: RootState) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
