import { NavLink } from "react-router"

export function InPut({type, id, placeholder, onChange, value, required}){
    return(
        <input type={type} id={id} required={required} placeholder={placeholder} onChange={onChange} value={value}
        className="rounded-sm px-2  text-[#2c3639] font-semibold border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A]"
        />
    )
}
export function LaBel({lblFor, lblName}){
    return(
        <label htmlFor={lblFor} className="text-[#F2D39A]" >{lblName}</label>
    )
}

export function NaVLink({linkedTo, Name, onClick}){
    return(
        <NavLink to={linkedTo} onClick={onClick} className={'cursor-pointer px-2 py-1 text-center bg-[#ffe2af] rounded-sm outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>{Name}</NavLink>
    )
}
