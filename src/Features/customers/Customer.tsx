import { useSelector } from "react-redux";
import type { RootState } from "../../Store";

function Customer() {
  const customer = useSelector((store: RootState)=> store.customer.fullName)
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
