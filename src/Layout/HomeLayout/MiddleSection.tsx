import { Avatar, Input, Box } from "@chakra-ui/react";
import StatusCard from "../../Components/Card/StatusCard";
import {Modal,  ModalCloseButton, ModalContent, ModalOverlay} from '@chakra-ui/react'
import { useThreads } from "../../context/ThreadsContex";
import PostCard from "../../Components/Card/PostCard";
import { useDisclosure } from "@chakra-ui/react";
import useFollows from "../../Hooks/useFollows";
const MiddleSection = () => {
  const { isOpen,onOpen, onClose } = useDisclosure()
  const { threads, isLoading, isError } = useThreads();
  const {UserById} = useFollows()
  


  return (
    <div className="flex flex-col">
      <p className="text-lg text-white font-bold">Home</p>
      <div className="mt-10 flex  justify-start w-full ">
        <div className="w-[10%]">
          <Avatar size={"sm"} name={UserById?.full_name} src={UserById?.profile_picture} />
        </div>
        <Box width={"90%"} display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} alignItems={"center"}>
            <Box className="w-[60%]">
              <Input
              onFocus={() => onOpen()}
                fontSize={"sm"}
                height={"10"}
                variant="unstyled"
                placeholder="What is happening?"
              />
            </Box>
          </Box>
        </Box>
      </div>
      {threads.map((item: any, index: number) => (
        <StatusCard key={index} data={item} />
      ))}
      {isLoading}
      {isError}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"white"} borderRadius={"lg"} p={"2"}>
          <ModalCloseButton color={"black"} />
          <PostCard close={onClose} />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MiddleSection;
