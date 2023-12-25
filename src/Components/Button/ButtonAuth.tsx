import { RiLogoutCircleLine, RiLoginCircleLine } from "react-icons/ri";

type Props = {
    type: "login" | "logout"
    onClick: () => void
}
const ButtonAuth = ( { type, onClick }: Props) => {

  return (
     
    <button 
    onClick={onClick}
    className="flex justify-center items-center gap-1">
        {
            type === "login" ? <RiLoginCircleLine className="text-white text-1xl" /> : <RiLogoutCircleLine className="text-white text-1xl" />
        }
      <p className="text-white text-sm">{
        type === "login" ? "Login" : "Logout"
}</p>
    </button>
  )
}

export default ButtonAuth