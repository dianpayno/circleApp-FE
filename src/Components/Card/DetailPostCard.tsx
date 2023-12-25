import { Box, Text, Avatar, Image, Input, Button } from "@chakra-ui/react";
import { IoHeartSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReplyCard from "./ReplyCard";
import { costumDate } from "../../utils/FormatDate";
import { useSelector } from "react-redux";
import useLikes from "../../Hooks/useLikes";
import { useMutation } from "react-query";
import { api } from "../../libs/api";
import { useThreads } from "../../services/ThreadsContex";

type Props = {
  item: any;
};

type Reply = {
  content: string;
  image: string;
  userId: number;
  threadId: number;
};

const StatusCard = (props: Props) => {
  const { item } = props;
  const [image, setImage] = useState(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeStamp = costumDate(item?.posted_at);
  const user = useSelector((state: any) => state.auth);
  const [idLike, setIdLike] = useState(0);
  const { addLikes, deleteLikes, setinputLike, inputlike, like, setLike } =
    useLikes();
    const {refetchThreads} = useThreads()
  const [reply, setReply] = useState<Reply>({
    content: "",
    image: "",
    userId: user.id,
    threadId: 0,
  });

  useEffect(() => {
    setinputLike({
      ...inputlike,
      userId: user.id,
      threadId: item?.id,
    });
  });

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
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setReply({
      ...reply,
      threadId: item?.id,
      [name]: value,
    });
  };

  const { mutate: addReply } = useMutation(
    async (e: any) => {
      e.preventDefault();
      try {
        await api.post("/replies", reply);
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        setIsOpen(false);
        refetchThreads();

        setReply({
          content: "",
          image: "",
          userId: user.id,
          threadId: 0,
        });
      },
    }
  );

  return (
    <Box>
      <Box display={"flex"} marginTop={"10"} color={"white"} gap={"3"}>
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
      </Box>
      <Box marginY={"2"}>
        <Text color={"white"} fontSize={"xs"}>
          {item?.content}
        </Text>
      </Box>
      {item?.image && (
        <Image
          objectFit="cover"
          borderRadius={"lg"}
          src={item.image}
          alt="Dan Abramov"
        />
      )}
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
          ) }{
            
          !like && (
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
      <Box display={"flex"} gap={"2"} my={"3"}>
        <Avatar size={"sm"} name={user.fullname} src={user.profile_picture} />
        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          {!isOpen ? (
            <Box display={"flex"} alignItems={"center"}>
              <Box className="w-[60%]">
                <Input
                  onFocus={() => setIsOpen(true)}
                  fontSize={"xs"}
                  height={"10"}
                  variant="unstyled"
                  placeholder="Add a comment for this post"
                />
              </Box>
            </Box>
          ) : (
            <motion.div
              className="w-full rounded-lg bg-[#1B1B1B] overflow-hidden"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <form onSubmit={addReply}>
                <textarea
                  onChange={handleChange}
                  value={reply.content}
                  autoFocus
                  name="content"
                  rows={1}
                  className="text-white bg-[#1B1B1B] text-sm focus:border-none focus:outline-none p-3 w-full resize-none"
                  placeholder="Type your comment..."
                />
                <Box
                  className={`flex items-center 
                  justify-between
                 py-3 px-3 w-full`}
                >
                  {image ? (
                    <Image
                      boxSize={"30px"}
                      objectFit={"cover"}
                      borderRadius={"md"}
                      src={image}
                      alt="mage"
                    />
                  ) : (
                    <MdAddPhotoAlternate size={30} className="text-green-500" />
                  )}
                  <Box display={"flex"} gap={"1"} alignItems={"center"}>
                    <input name="image" ref={imageRef} type="file" hidden />
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
      </Box>

      {sortedReply &&
        sortedReply?.map((item: any, index: number) => (
          <Box key={index} my={"3"}>
            <ReplyCard data={item} />
          </Box>
        ))}
    </Box>
  );
};

export default StatusCard;
