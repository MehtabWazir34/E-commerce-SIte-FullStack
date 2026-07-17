
import { NavLink } from "react-router"

export function InPut({type, id, placeholder, onChange, value, required}){
    return(
        <input type={type} id={id} required={required} placeholder={placeholder} onChange={onChange} value={value} autoComplete="off"
        className="w-full bg-chalk text-sm px-4 py-2.5 rounded-xl border border-steel focus:outline-none focus:bg-white focus:border-volt transition-all placeholder-slate/50 text-court font-body"
        />
    )
}

export function LaBel({lblFor, lblName}){
    return(
        <label htmlFor={lblFor} className="text-gray-400 font-body font-bold uppercase tracking-wider text-[11px]" >{lblName}</label>
    )
}

export function NaVLink({linkedTo, Name, onClick}){
    return(
        <NavLink 
            to={linkedTo} 
            onClick={onClick} 
            className={({ isActive }) => 
                `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                    isActive 
                        ? 'bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-sm shadow-purple-100' 
                        : 'bg-white text-purple-500 border-steel hover:bg-chalk hover:text-purple-700'
                }`
            }
        >
            {Name}
        </NavLink>
    )
}