interface InputProps {
    value: string
    label: string
    onChange: (value: string) => void
}


export function InputPerfil({ value, label, onChange }: InputProps) {


    return (
        <div className="flex flex-col flex-1 relative">
            <label className="absolute bg-white -top-3 left-3 font-bold">{label}</label>
            <input className="border border-gray-300 rounded-md w-full h-10 pl-3"
                value={value}
                onChange={(e) => onChange(e.target.value)}></input>
        </div>
    )
}