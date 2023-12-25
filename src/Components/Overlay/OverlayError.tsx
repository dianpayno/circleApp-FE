
import { Box, Image, Text } from "@chakra-ui/react";
import notfoundimg from "../../assets/notfound.svg"

const OverlayError = () => {
  return (
    <Box
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        zIndex={10}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        >
         <Image 
         boxSize={"120px"}
         src={notfoundimg}/>
        <Text color={"black"} size={"sm"}>Upss Sorry can't connect to server</Text>
        </Box>
        
      </Box>
  )
}

export default OverlayError