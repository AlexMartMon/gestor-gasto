import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  BudgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  availableAmount: number;
  totalExpenses: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);
  const totalExpenses = useMemo(
    () => state.expense.reduce((total, expense) => expense.amount + total, 0),
    [state.expense]
  );
  const availableAmount = state.budget - totalExpenses;
  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, availableAmount }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
