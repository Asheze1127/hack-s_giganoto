type Props={
    label:string
    type?: "submit" | "reset" | "button" // typeをオプショナルにし、デフォルト値を設定
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    textColor?: string;
    paddingX?: string;
    paddingY?: string;
    fontWeight?: string;
    rounded?: string;
    width?: string;
    height?: string;
}

export const PrimaryButton=({
    label,
    type = "button", // typeのデフォルト値を "button" に設定
    backgroundColor = "bg-blue-500",
    hoverBackgroundColor = "hover:bg-blue-700",
    textColor = "text-white",
    paddingX = "px-4",
    paddingY = "py-2",
    fontWeight = "font-bold",
    rounded = "rounded",
    width,
    height,
}:Props)=>{
    const buttonClasses = [
        backgroundColor,
        hoverBackgroundColor,
        textColor,
        paddingX,
        paddingY,
        fontWeight,
        rounded,
        width, 
        height, 
    ].filter(Boolean).join(" "); 

    return(
        <button type={type} className={buttonClasses}>
            {label}
        </button>
    )
}