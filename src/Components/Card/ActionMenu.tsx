import { BsThreeDots } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import { Box, Collapse, Text } from "@chakra-ui/react";
import useThreadss from "../../Hooks/useThreadss";


type idThreadsProps = {
  id: number;
};

const ActionMenu = ({ id }: idThreadsProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { deteleThreads } = useThreadss();

  return (
    <>
      <BsThreeDots
        cursor={"pointer"}
        onMouseEnter={onToggle}
        className="text-white text-xl"
      />
      <Box className="absolute -right-10 z-30 top-0">
        <Collapse onMouseLeave={onToggle} in={isOpen} animateOpacity>
          <Box p="5px" color="black" mt="4" bg="white" rounded="md">
            <Box
              onClick={() => deteleThreads(id)}
              className="flex items-center gap-2 text-xs mb-2 cursor-pointer"
            >
              <AiOutlineDelete />
              <Text>Delete</Text>
            </Box>
            <Box className="flex items-center gap-2 text-xs cursor-pointer">
              <FiEdit />
              <Text>Edit</Text>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default ActionMenu;
