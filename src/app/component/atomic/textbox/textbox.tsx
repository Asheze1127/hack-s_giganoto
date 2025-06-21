type Props={
    label?:string;
    id?: string; 
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string; 
}

export const PrimaryTextBox=({
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    name
}:Props)=>{
    const inputId = id
    return(
        <div className="mb-2">
            <input
                id={inputId}
                type={type}
                name={name} 
                value={value}
                onChange={onChange} 
                placeholder={placeholder}
                className="shadow border rounded py-2 px-3 text-gray-700"
            />
        </div>
    );
}