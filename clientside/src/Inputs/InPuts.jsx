export function InPut({type, id, placeholder, onChange, value, required}){
    return(
        <input type={type} id={id} required={required} placeholder={placeholder} onChange={onChange} value={value}
        className="rounded-full px-2 py-1 font-semibold border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A]"
        />
    )
}
export function LaBel({lblFor, lblName}){
    return(
        <label htmlFor={lblFor} className="text-[#F2D39A]" >{lblName}</label>
    )
}

export function textArea({id, placeholder, value, onChange, }){
    return(
        <textarea id={id} placeholder={placeholder} value={value} onChange={onChange}
        className="rounded-full border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A] p-2 text-xs"
        >{value}</textarea>
    )
}