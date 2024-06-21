import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBuget";


export default function FilterByCategory() {
    const {dispatch} =  useBudget()
    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filter-expense', payload: {id: e.target.value}})
    }
  return (
    <div className='bg-white rounded-lg shadow-lg p-10 mt-10'>
        <form>
            <div className='flex flex-col md:flex-row md:items-center gap-5'>
                <label htmlFor="category">Filtrar Gastos</label>
                <select onChange={handleChange} className="bg-slate-100  p-3 flex-1  rounded" id="category">
                    <option value="">-- Todas las categorías --</option>
                    {categories.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
