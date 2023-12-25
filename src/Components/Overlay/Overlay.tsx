import { BeatLoader } from "react-spinners";
import { Box } from "@chakra-ui/react";

const Overlay = () => {
  return (
    <Box
        position={"fixed"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"white"}
        zIndex={10}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <BeatLoader color="#36d7b7" />
      </Box>
  )
}

export default Overlay