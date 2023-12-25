import { Box, Text, Avatar, Image } from "@chakra-ui/react";
import { IoHeartSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { formatDate } from "../../utils/FormatDate";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import useLikes from "../../Hooks/useLikes";

type Props = {
  data: any;
};

const StatusCard = (props: Props) => {
  const { data } = props;
  const user = useAppSelector((state: RootState) => state.auth);
  const time = formatDate(data?.posted_at);
  const { addLikes, deleteLikes, setinputLike, inputlike, like, setLike } =
    useLikes();
  const [idLike, setIdLike] = useState(0);
 

  useEffect(() => {
    setinputLike({
      ...inputlike,
      userId: user.id,
      threadId: data.id,
    });
  },[data]);
  
  

  useEffect(() => {
    data?.likes?.filter((item: any) => {
      if (item.userId === user.id) {
        return setLike(true);
      }
    });
  }, [addLikes, deleteLikes, data?.likes, user.id]);

  useEffect(() => {
    data?.likes?.map((item: any) => {
      if (item.userId === user.id) {
        return setIdLike(item.id);
      }
    });
  });

  

  return (
    <Box display={"flex"} marginTop={"10"} color={"white"} gap={"3"}>
      <Avatar
        name={data.user.full_name}
        size={"sm"}
        src={data.user.profile_picture}
      />
      <Box>
        <Box display={"flex"} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            textTransform={"capitalize"}
          >
            {data.user.full_name}
          </Text>
          <Text
            fontSize={"xs"}
            display={"flex"}
            marginLeft={"1"}
            textTransform={"lowercase"}
            color="gray"
          >
            @{data.user.username}
          </Text>
          <Text fontSize={"xs"} display={"flex"} marginLeft={"1"} color="gray">
            {time}
          </Text>
        </Box>
        <Link to={`/details-post/${data.id}`}>
          <Box my={"2"}>
            <Text fontSize={"xs"}>{data.content}</Text>
          </Box>
          {data.image ? (
            <Image
              objectFit="cover"
              borderRadius={"lg"}
              src={data.image}
              alt="Dan Abramov"
            />
          ) : null}
        </Link>
        <Box display={"flex"} gap={"3"} marginTop={"2"}>
          {/* interaction Section */}
          <Box
            display={"flex"}
            cursor={"pointer"}
            alignItems={"center"}
            gap={"1"}
          >
            {like && (
              <IoHeartSharp
                cursor={"pointer"}
                size={20}
                color={"red"}
                onClick={() => deleteLikes(idLike)}
              />
            )}
            {!like && (
              <IoIosHeartEmpty
                cursor={"pointer"}
                size={20}
                color={"gray"}
                onClick={addLikes}
              />
            )}
            <Text fontSize={"xs"} color={"gray"}>
              {data.likes?.length === 0
                ? `No Likes`
                : `${data.likes?.length} Likes`}
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1"}>
            <AiOutlineComment cursor={"pointer"} size={20} color="gray" />
            <Text fontSize={"xs"} color={"gray"}>
              {data.replies?.length === 0
                ? `No Replies`
                : `${data.replies?.length} Replies`}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusCard;
