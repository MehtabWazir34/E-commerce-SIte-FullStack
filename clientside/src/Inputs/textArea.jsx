export function textArea({id, placeholder, value, onChange, }){
    return(
        <textarea id={id} placeholder={placeholder} value={value} onChange={onChange}
        className="rounded-full border border-gray-500 outline-0 bg-[#ffe2af] focus:bg-[#F2D39A] p-2 text-xs"
        >{value}</textarea>
    )
}