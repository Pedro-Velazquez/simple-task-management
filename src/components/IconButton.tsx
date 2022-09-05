import {IconType} from "react-icons";

export interface IconButtonProps {
  Icon: IconType
  onClick: () => void
}

export default function IconButton({Icon, onClick}: IconButtonProps) {
  return (
    <button className="p-1 shadow-sm shadow-black rounded-full hover:bg-black text-black hover:text-white" onClick={onClick}>
      <Icon />
    </button>
  )
}
