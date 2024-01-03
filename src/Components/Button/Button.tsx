type ButtonProps = {
    name: string
    onClick?: () => void
    size: string
    type?: "button" | "submit" | "reset"

}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { name, onClick, size, type } = props

    const small = "py-2 px-2 text-xs"
    const large = "py-2 px-7 text-lg w-full"
  return (
    <div>
        <button
        type={type}
        onClick={onClick}
        className={`bg-green-500 text-sm capitalize text-white rounded-full font-bold ${size === "small" ? small : large}`}>{name}</button>
    </div>
  )
}

export default Button