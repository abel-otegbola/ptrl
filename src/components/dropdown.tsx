'use client'
import { useOutsideClick } from "@/helpers/isClickOutside";
import { ReactNode, useRef, useState } from "react";
import CaratDown from "../../public/fonts/CaratDown";

type option = {
  id: string | number;
  icon?: ReactNode;
  title: string;
}

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    placeholder?: string;
    options?: option[];
}

export default function Dropdown({ className, disabled, label, name, options, value, onChange, error, placeholder }: dropdownProps) {
    const [focus, setFocus] = useState(false)
    const [search, setSearch] = useState("")
    const [useSearch, setUseSearch] = useState(false)
    const [active, setActive] = useState<option>({ id: 0, title: "", icon: null })

    const optionsRef = useOutsideClick(setFocus, false)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value: string) => {
      onChange(value)
    }

    return (
        <div ref={optionsRef} className={`relative flex flex-col gap-1 ${className}`}>
            <div className="flex justify-between gap-4">
                { label ? <label htmlFor={name} className={`text-[14px] font-bold ${focus ? "text-primary" : ""}`}>{label}</label> : "" }
                { error && !focus ? <p className="px-2 text-[12px] italic text-[#C22026] backdrop-blur-sm">{error}</p> : "" }
            </div>

            <div className={`flex items-center relative rounded-lg bg-transparent w-full p-1 px-4 border duration-500 z-[1] 
                ${error && !focus ? "border-[#C22026] text-red-500" : "border-black/[0.2]"}
                ${focus ? "border-black shadow-input-active" : " "}
                ${ className }
            `}>
                <span className="text-[16px]">
                  {/* <Map /> */}
                </span>
                <input
                    ref={inputRef}
                    className={` p-2 w-[96%] outline-none bg-transparent cursor-pointer
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    value={search}
                    placeholder={active.title || placeholder}
                    id={name}
                    onClick={() => setFocus(!focus)}
                    onChange={(e) => {setSearch(e.target.value); setUseSearch(true)}}
                    onBlur={(e) =>  setUseSearch(false)}
                />

                <span className={`${!focus ? "rotate-0" : "rotate-180" } duration-500 absolute right-2`}><CaratDown /></span>
            </div>

            <div className={`rounded-[8px] absolute top-[110%] left-0 w-full max-h-[200px] z-[1000] bg-white shadow-md duration-700 overflow-y-auto border border-gray-500/[0.2] ${(focus || useSearch) ? "block" : "hidden"}`}>
            <div className="[mask-image:_linear-gradient(to_bottom,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]py-4">
                {
                  (useSearch ? options?.filter(item => item.title.toUpperCase().indexOf(search.toUpperCase()) !== -1) : options)?.map((option: option) => (
                    <div tabIndex={1} key={option.id} 
                      onClick={() => {setUseSearch(false); setActive(option); handleChange(option.title); onChange(option.title); setFocus(false); setSearch(option.title)}} 
                      className={`p-4 flex w-full items-center cursor-pointer gap-2 mb-[2px] hover:text-primary bg-white ${option.title === value ? "text-primary" : ""}`}
                    >
                      <span className="">{option.icon}</span>
                      {option.title}
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    )
}