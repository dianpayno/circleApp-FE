import { Box, Text, Avatar,  Input,} from "@chakra-ui/react";
import { IoHeartSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReplyCard from "./ReplyCard";
import { costumDate } from "../../utils/FormatDate";
import { useSelector } from "react-redux";
import useLikes from "../../Hooks/useLikes";
import { useMutation } from "react-query";
import { api } from "../../libs/api";
import { useThreads } from "../../context/ThreadsContex";
import GridLayout3 from "../GridPost/GridLayout3";
import GridLayout4 from "../GridPost/GridLayout4";
import GridLayoutMore from "../GridPost/GridLayoutMore";
import GridLayout2 from "../GridPost/GridLayout2";
import GridLayout1 from "../GridPost/GridLayout1";
import { IoIosCloseCircle } from "react-icons/io";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ModalDetailImage from "./ModalDetailImage";
import useFollows from "../../Hooks/useFollows";
import ActionMenu from "./ActionMenu";

type Props = {
  item: any;
  refetchThreadsById: () => void;
};

type Reply = {
  content: string;
  threadId: number;
};

const DetailPostCard = (props: Props) => {
  const { item } = props;
  const [isOpened, setIsOpened] = useState(false);
  const timeStamp = costumDate(item?.posted_at);
  const user = useSelector((state: any) => state.auth);
  const [idLike, setIdLike] = useState(0);
  const { addLikes, deleteLikes, setinputLike, inputlike, like, setLike } =
    useLikes();
    const {UserById} = useFollows();
  const { refetchThreads } = useThreads();
  const [reply, setReply] = useState<Reply>({
    content: "",
    threadId: 0,
  });

 

  useEffect(() => {
    setinputLike({
      ...inputlike,
      userId: user.id,
      threadId: item?.id,
    });
  }, [item]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sortedReply = item?.replies?.sort((a: any, b: any) => {
    return b.id - a.id;
  });

  useEffect(() => {
    item?.likes?.map((item: any) => {
      if (item.userId === user.id) {
        setLike(true);
      }
    });
  }, [item?.likes]);

  useEffect(() => {
    item?.likes?.map((item: any) => {
      if (item.userId === user.id) {
        setIdLike(item.id);
      }
    });
  }, [item?.likes, item]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setReply({
      ...reply,
      threadId: item?.id,
      [name]: value,
    });
  };

  const { mutate: addReply } = useMutation(
    async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await api.post("/replies", reply, { headers });
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        refetchThreads();
        setIsOpened(false);
        setReply({
          content: "",
          threadId: 0,
        });
      },
    }
  );

  return (
    <Box>
      <Box display={"flex"} marginTop={"10"} color={"white"} gap={"3"} position={"relative"}>
        <Avatar
          name={item?.user.full_name}
          size={"sm"}
          src={item?.user.profile_picture}
        />
        <Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Text
              fontSize={"xs"}
              fontWeight={"bold"}
              textTransform={"capitalize"}
            >
              {item?.user.full_name}
            </Text>
            <Text
              fontSize={"xs"}
              display={"flex"}
              textTransform={"lowercase"}
              color="gray"
            >
              @{item?.user.username}
            </Text>
          </Box>
        </Box>
        {
          item?.userId === user.id &&
        <Box className="absolute right-2 top-2 z-50">
         <ActionMenu id={item?.id}/>
        </Box>
        }
      </Box>
      <Box marginY={"2"}>
        <Text color={"white"} fontSize={"xs"}>
          {item?.content}
        </Text>
      </Box>
      <Box onClick={onOpen} cursor={"pointer"}>
        {item?.image.length === 3 && <GridLayout3 dataImage={item?.image} />}
        {item?.image.length === 4 && <GridLayout4 dataImage={item?.image} />}
        {item?.image.length > 4 && <GridLayoutMore dataImage={item?.image} />}
        {item?.image.length === 2 && <GridLayout2 dataImage={item?.image} />}
        {item?.image.length === 1 && <GridLayout1 dataImage={item?.image} />}
      </Box>
      {/* created post */}
      <Box color={"gray"} display={"flex"} gap={"1"} marginTop={"2"}>
        <Text fontSize={"xs"}>{timeStamp}</Text>
      </Box>
      <Box display={"flex"} gap={"3"} marginTop={"2"}>
        {/* interaction Section */}
        <Box display={"flex"} alignItems={"center"} gap={"1"}>
          {like && (
            <IoHeartSharp
              cursor={"pointer"}
              size={20}
              onClick={() => deleteLikes(idLike)}
              color={"red"}
            />
          )}
          {!like && (
            <IoIosHeartEmpty
              cursor={"pointer"}
              size={20}
              onClick={addLikes}
              color={"gray"}
            />
          )}
          <Text fontSize={"xs"} color={"gray"}>
            {item?.likes?.length === 0 ? null : `${item?.likes?.length} Likes`}
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1"}>
          <AiOutlineComment cursor={"pointer"} size={20} color="gray" />
          <Text fontSize={"xs"} color={"gray"}>
            {item?.replies?.length} Replies
          </Text>
        </Box>
      </Box>
      <Box display={"flex"} gap={"2"} my={"3"}>
        <Avatar
          size={"sm"}
          name={UserById?.full_name}
          src={UserById?.profile_picture}
        />
        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          {!isOpened ? (
            <Box display={"flex"} alignItems={"center"}>
              <Box className="w-[60%]">
                <Input
                  onFocus={() => setIsOpened(true)}
                  fontSize={"xs"}
                  height={"10"}
                  variant="unstyled"
                  placeholder="Add a comment for this post"
                />
              </Box>
            </Box>
          ) : (
            <motion.div
              className="w-full rounded-lg px-2 bg-white overflow-hidden"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex justify-center items-center gap-1">
                <textarea
                  onChange={handleChange}
                  value={reply.content}
                  autoFocus
                  name="content"
                  rows={1}
                  className=" bg-white text-sm focus:border-none focus:outline-none p-2 w-full resize-none"
                  placeholder="Type your comment..."
                />

                <IoIosSend size={20} onClick={addReply} />
              </div>
            </motion.div>
          )}
        </Box>
      </Box>
      {item?.replies?.length === 0 && (
        <>
          <Text
            mt={"10"}
            color={"white"}
            fontSize={"xs"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            No Comment yet
          </Text>
          <Text mb={"3"} color={"white"} fontSize={"xs"} textAlign={"center"}>
            Start the conversation
          </Text>
        </>
      )}
      {/* kolom komentar */}

      {sortedReply &&
        sortedReply?.map((item: any, index: number) => (
          <Box key={index} my={"3"}>
            <ReplyCard data={item} />
          </Box>
        ))}
      <Modal
        size={"3xl"}
        blockScrollOnMount={true}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Box display={"flex"} justifyContent={"flex-end"} m={2}>
            <IoIosCloseCircle
              color={"gray"}
              cursor={"pointer"}
              size={30}
              onClick={onClose}
            />
          </Box>
          <ModalBody>
            <ModalDetailImage image={item?.image} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DetailPostCard;
