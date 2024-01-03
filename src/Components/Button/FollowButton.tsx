import { Button } from "@chakra-ui/react";


type ButtonProps = {
    name: string
    onClick?: any
}

const FollowButton = (props: ButtonProps) => {
 const { name, onClick } = props

  return (
    <Button
    colorScheme="white"
    size={"xs"}
    borderRadius={"full"}
    variant="outline"
    textTransform={"capitalize"}
    fontSize={"xs"}
    onClick={onClick}
  >
   {name}
  </Button>
  )
}

export default FollowButton