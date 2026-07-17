export function TextArea ({id, placeholder, value, onChange, }){
    return(
        <textarea id={id} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full bg-chalk border border-steel rounded-2xl text-sm p-3.5 focus:outline-none focus:border-volt focus:bg-white transition-all placeholder-slate/50 resize-none outline-none text-court font-body"
        >{value}</textarea>
    )
}
