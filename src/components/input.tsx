'use client'
import { ReactNode, InputHTMLAttributes, useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Input({ className, disabled, label, name, value, type, onChange, error, placeholder, leftIcon, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)


    return (
        <div className="flex flex-col w-full gap-1">
            
            <div className="flex justify-between gap-4">
                { label ? <label htmlFor={name} className={`text-[14px] font-bold ${focus ? "text-primary" : ""}`}>{label}</label> : "" }
                { error && !focus ? <p className="px-2 text-[12px] italic text-[#C22026] backdrop-blur-sm">{error}</p> : "" }
            </div>

            <div className={`flex items-center gap-1 relative rounded-lg w-full border p-1 px-1 duration-500 
                ${error && !focus ? "border-[#C22026] text-[#C22026] " : "border-[#E4E4E4]"}
                ${focus ? "border-black shadow-input-active" : ""}
                ${className}
            `}>
                <span className={`${!focus ? "opacity-[0.4]": "text-primary"} ml-2 ${leftIcon ? "mr-2" : ""}`}>{ leftIcon }</span>
                <input 
                    className={` py-2 w-full outline-none bg-transparent
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    disabled={disabled}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />

            </div>
        </div>
    )
}