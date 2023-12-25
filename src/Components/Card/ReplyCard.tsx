import { Box, Text, Avatar } from "@chakra-ui/react";

import { useState } from "react";
import{ useQuery} from "react-query"
import { api } from "../../libs/api";
import {formatDate} from "../../utils/FormatDate"

type Props = {
    data:any
}

const ReplyCard = (props: Props) => {
  const {data} = props



const {data:userData, refetch}= useQuery(["userData",data.id],async()=>{
  try{
    const response = await api.get(`/replies/${data.id}`);
    return response.data.data
  }
  catch(err){
    console.log(err);
  }
},{
  onSuccess: ()=>{
    refetch()
  }
})






  return (
    <Box display={"flex"} color={"white"} gap={"2"}>
      <Avatar
        size={"sm"}
        src={userData?.user?.image}
        name={userData?.user?.full_name}
      />

      <Box>
        <Box display={"flex"} alignItems={"center"} gap={"1"}>
          <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            textTransform={"capitalize"}
          >
            {userData?.user?.full_name}
          </Text>
          <Text
            fontSize={"xs"}
            display={"flex"}
            textTransform={"lowercase"}
            color="gray"
          >
         @{userData?.user?.username}
          </Text>
          <Text fontSize={"xs"} color={"gray"}>
            •
          </Text>
          <Text
            fontSize={"xs"}
            display={"flex"}
            textTransform={"lowercase"}
            color="gray"
          >
            {formatDate(data?.posted_at)}
          </Text>
        </Box>
        <Box marginY={"1"}>
          <Text fontSize={"xs"}>
            {data.content}
          </Text>
        </Box>

        {/* <Image
           
            objectFit="cover"
            borderRadius={"lg"}
            src="https://img.freepik.com/free-photo/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.jpg?size=626&ext=jpg&ga=GA1.2.714462566.1697981532&semt=sph"
            alt="Dan Abramov"
          /> */}

        <Box display={"flex"} gap={"3"} marginTop={"2"}>
          {/* interaction Section */}
          {/* <Box display={"flex"} alignItems={"center"} gap={"1"}>
            {loveButton ? (
              <IoHeartSharp
                cursor={"pointer"}
                size={20}
                onClick={() => setloveButton(false)}
                color={"red"}
              />
            ) : (
              <IoIosHeartEmpty
                cursor={"pointer"}
                size={20}
                onClick={() => setloveButton(true)}
                color={"gray"}
              />
            )}
            <Text fontSize={"xs"} color={"gray"}>
              106
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1"}>
            <AiOutlineComment cursor={"pointer"} size={20} color="gray" />
            <Text fontSize={"xs"} color={"gray"}>
              16
            </Text>
          </Box>
          <MdOutlineReply cursor={"pointer"} size={20} color="gray" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyCard;
