import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBuget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const isValid = useMemo(() => {
    return budget <= 0 || isNaN(budget);
  }, [budget]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          {" "}
          Definir presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border bordger-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="definir presupuesto"
        disabled={isValid}
        className="disabled:opacity-10 bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
      />
    </form>
  );
}