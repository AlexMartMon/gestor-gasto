import { useBudget } from "../hooks/useBuget";
import { useMemo } from "react";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();
  const isEmpty = useMemo(() => state.expense.length === 0, [state.expense]);
  const filteredExpenses = state.currentCategory
    ? state.expense.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expense;
  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold mt-5">
            Listado de gastos
          </p>
          {filteredExpenses.map((item) => (
            <ExpenseDetail key={item.id} expense={item} />
          ))}
        </>
      )}
    </div>
  );
}
