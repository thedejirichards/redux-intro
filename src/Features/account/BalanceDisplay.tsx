import { useSelector } from "react-redux";
import type { RootState } from "../../Store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const accountBalance = useSelector((state: RootState)=> state.account.balance)
  return <div className="balance">{formatCurrency(accountBalance)}</div>;
}

export default BalanceDisplay;
