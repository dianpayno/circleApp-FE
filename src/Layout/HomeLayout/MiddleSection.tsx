import { MdAddPhotoAlternate } from "react-icons/md";
import { Avatar, Input, Button, Box, Image, useRangeSlider } from "@chakra-ui/react";
import StatusCard from "../../Components/Card/StatusCard";
import { useRef} from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../store/hooks";
import { useThreads } from "../../services/ThreadsContex";
import  useThreadss  from "../../Hooks/useThreadss";

const MiddleSection = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state: any) => state.auth);
  const { threads, isLoading, isError } = useThreads();
  const {handleChange, image, data, isOpen, setIsOpen, addPost} = useThreadss()
  console.log(user)
  const handleImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white font-bold">Home</p>
      <div className="mt-10 flex  justify-start w-full ">
        <div className="w-[10%]">
          <Avatar size={"sm"} name={user.fullname} src={user.profile_picture} />
        </div>
        <Box width={"90%"} display={"flex"} flexDirection={"column"}>
          {!isOpen ? (
            <Box display={"flex"} alignItems={"center"}>
              <Box className="w-[60%]">
                <Input
                  onFocus={() => setIsOpen(true)}
                  fontSize={"sm"}
                  height={"10"}
                  variant="unstyled"
                  placeholder="What is happening?"
                />
              </Box>
            </Box>
          ) : (
            <motion.div
              className="w-full rounded-lg bg-[#1B1B1B] overflow-hidden"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={addPost}>
                <textarea
                  autoFocus
                  onChange={handleChange}
                  name="content"
                  value={data.content}
                  rows={2}
                  className="text-white bg-[#1B1B1B] text-sm focus:border-none focus:outline-none p-3 w-full resize-none"
                  placeholder="What is happening?"
                />
                <Box
                  className={`flex items-center 
                  justify-between
                 py-3 px-3 w-full`}
                >
                  {image ? (
                    <Image
                      boxSize={"35px"}
                      objectFit={"cover"}
                      borderRadius={"md"}
                      src={image}
                      alt="mage"
                    />
                  ) : (
                    <MdAddPhotoAlternate
                      onClick={handleImage}
                      size={30}
                      className="text-green-500"
                    />
                  )}
                  <Box display={"flex"} gap={"1"} alignItems={"center"}>
                    <input
                      onChange={handleChange}
                      name="gambar"
                      ref={imageRef}
                      type="file"
                      hidden
                      multiple
                    />
                    <Button
                      colorScheme="red"
                      borderRadius={"lg"}
                      size={"sm"}
                      px={"3"}
                      py={"3"}
                      fontSize={"xs"}
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="whatsapp"
                      borderRadius={"lg"}
                      size={"sm"}
                      px={"3"}
                      py={"3"}
                      fontSize={"xs"}
                      type="submit"
                    >
                      Post
                    </Button>
                  </Box>
                </Box>
              </form>
            </motion.div>
          )}
        </Box>
      </div>
      {threads.map((item: any, index: number) => (
        <StatusCard key={index} data={item} />
      ))}
      {isLoading}
      {isError}
    </div>
  );
};

export default MiddleSection;
