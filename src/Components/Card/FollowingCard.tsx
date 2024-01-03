import FollowButton from "../Button/FollowButton";
import { Box, Avatar, Text } from "@chakra-ui/react";
import useFollows from "../../Hooks/useFollows";
import { useState } from "react";
type Props ={
    dataFollowing?:any
    index?:number
}

const FollowingCard = ({dataFollowing, index}:Props) => {
  const [active, setActive] = useState(-1);
  const isactive = active === index
  const {followUser,unFollowUser} = useFollows()
  const data = {
    followingId : dataFollowing.user.id
  }

const handleFollowingButton = (index:any, id:any) => {
  unFollowUser(id)
  setActive(index)
}

const handleFollowbutton = (data:any) => {
  setActive(-1)
  followUser(data)
}

  return (
    <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
    gap={"2"}
    my={"3"}
  >
    <Box display={"flex"} alignItems={"center"} gap={"2"}>
      <Avatar
        size="sm"
        name={dataFollowing.user.full_name}
        src={dataFollowing.user.profile_picture}
      />
      <Box>
        <Text
          color={"white"}
          fontSize={"xs"}
          textTransform={"capitalize"}
          fontWeight={"bold"}
        >
          {dataFollowing.user.full_name}
        </Text>
        <Text color={"gray"} fontSize={"xs"} textTransform={"lowercase"}>
          @{dataFollowing.user.username}
        </Text>
        <Text color={"white"} fontSize={"xs"}>
          {dataFollowing.user.profile_description}
        </Text>
      </Box>
    </Box>
      {
        !isactive? (
          <FollowButton name="following"
          onClick={()=>handleFollowingButton(index, dataFollowing.id)}
          />
          
        ):
    <FollowButton name="follow"
    onClick={()=>handleFollowbutton(data)}
    />
      }

  </Box>
  )
}

export default FollowingCard