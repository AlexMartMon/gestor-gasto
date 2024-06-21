import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBuget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const { dispatch, state,availableAmount} = useBudget();
  const [prevAmount, setPrevAmount] = useState(0)
  useEffect(() => {
    if (state.editingId) {
      const editExpense =  state.expense.filter(current => current.id === state.editingId)[0]
      setExpense(editExpense)
      setPrevAmount(editExpense.amount)
    }
  }, [state.editingId])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({ ...expense, [name]: isAmountField ? +value : value });
  };

  const handleDateChange = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if ((expense.amount - prevAmount) > availableAmount) {
      setError("Ese gasto se sale del presupuesto");
      return;
    }
    if (state.editingId) {
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }

    setExpense({
      amount: 0,
      category: '',
      expenseName: '',
      date: new Date()
    })
    setPrevAmount(0)
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="text-2xl font-black uppercase text-center border-b-4 py-2 border-blue-500">
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="añade el nombre del gasto"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.expenseName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Cantidad"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.category}
        >
          <option value="">-- Selecione --</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          value={expense.date}
          onChange={handleDateChange}
          className="bg-slate-100 p-2 border-0"
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  );
}
