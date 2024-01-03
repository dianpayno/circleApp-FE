import { Box, Text, Avatar, Collapse } from "@chakra-ui/react";
import { IoHeartSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { formatDate } from "../../utils/FormatDate";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import useLikes from "../../Hooks/useLikes";
import GridLayout1 from "../GridPost/GridLayout1";
import GridLayout2 from "../GridPost/GridLayout2";
import GridLayout3 from "../GridPost/GridLayout3";
import GridLayout4 from "../GridPost/GridLayout4";
import GridLayoutMore from "../GridPost/GridLayoutMore";
import ActionMenu from "./ActionMenu";
import { color } from "framer-motion";

type Props = {
  data: any;
};

const StatusCard = (props: Props) => {
  const { data } = props;
  const user: any = useAppSelector((state: RootState) => state.auth);
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
  }, [data]);

  const dataLike =data?.likes?.filter((item: any) => {
    if (item.userId === user.id) {
      return item;
    }
  });

  useEffect(() => {
 if (dataLike.length > 0) {
   setLike(true);
 }
  }, [data?.likes, addLikes, deleteLikes, user.id]);

  useEffect(() => {
    data?.likes?.map((item: any) => {
      if (item.userId === user.id) {
        return setIdLike(item.id);
      }
    });
  }, [data?.likes, user.id]);

  return (
    <Box
      marginTop={"5"}
      borderRadius={"lg"}
      backgroundColor={"#1A2421"}
      color={"white"}
      gap={"1"}
    >
      <Box className="w-full px-3 pt-2 flex gap-2 items-center relative pr-2">
        <Avatar
          name={data.user.full_name}
          size={"sm"}
          src={data.user.profile_picture}
        />
        <Box display={"flex"} flexDirection={"column"}>
          <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            textTransform={"capitalize"}
          >
            {data.user.full_name}
          </Text>
          <Box className="flex items-center">
            <Text fontSize={"xs"} textTransform={"lowercase"} color="gray">
              @{data.user.username}
            </Text>
            <Text
              fontSize={"xs"}
              marginLeft={"2"}
              display={"flex"}
              color="gray"
            >
              {time}
            </Text>
          </Box>
        </Box>
        {
          data.userId === user.id &&
        <Box className="absolute right-2 top-2 z-50">
         <ActionMenu id={data.id} />
        </Box>
        }
      </Box>
      <Link to={`/details-post/${data.id}`}>
        <Box my={"2"}>
          <Text fontSize={"xs"} className="px-3">
            {data.content}
          </Text>
        </Box>
        <Box cursor={"pointer"}>
          {data.image?.length === 3 && <GridLayout3 dataImage={data.image} />}
          {data.image?.length === 4 && <GridLayout4 dataImage={data.image} />}
          {data.image?.length > 4 && <GridLayoutMore dataImage={data.image} />}
          {data.image?.length === 2 && <GridLayout2 dataImage={data.image} />}
          {data.image?.length === 1 && <GridLayout1 dataImage={data.image} />}
        </Box>
      </Link>
      <Box display={"flex"} gap={"3"} className="px-2 py-3">
        {/* interaction Section */}
        <Box
          display={"flex"}
          cursor={"pointer"}
          alignItems={"center"}
          gap={"1"}
        >
          {like && dataLike.length > 0 ? (
            <IoHeartSharp
              cursor={"pointer"}
              size={20}
              color={"red"}
              onClick={() => deleteLikes(idLike)}
            />
          ):
           (
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
  );
};

export default StatusCard;
