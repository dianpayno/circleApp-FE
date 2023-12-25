type ButtonProps = {
    name: string
    onClick?: () => void
    size: string

}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { name, onClick, size } = props

    const small = "py-3 px-2 text-xs"
    const large = "py-2 px-7 text-lg w-full"
  return (
    <div>
        <button className={`bg-green-500 text-sm capitalize text-white rounded-full font-bold ${size === "small" ? small : large}`}>{name}</button>
    </div>
  )
}

export default Button