import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export default function Button({className = "", ...rest}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button className={[
    "bg-indigo-800 px-3 py-1.5 rounded-full text-white hover:shadow-sm hover:shadow-pending hover:bg-transparent hover:text-pending",
    className
  ].join(" ")} {...rest} />
}
