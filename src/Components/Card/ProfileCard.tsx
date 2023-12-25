import { Box, Text, Avatar } from "@chakra-ui/react";
import FollowButton from "../Button/FollowButton";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getAllUser } from "../../store/slice/dataUserSlice";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import Overlay from "../Overlay/Overlay";
import useFollows from "../../Hooks/useFollows";

const ProfileCard = () => {
  const userId = useAppSelector((state: RootState) => state.auth.id);
  // const dispatch = useAppDispatch();
  // const allUser = useAppSelector(
  //   (state: RootState) => state.dataUser.data.data
  // );
  // useEffect(() => {
  //   dispatch(getAllUser());
  // }, []);

  // const dataUserById = allUser?.find((item: any) => item.id === userId);
  // if (!dataUserById) {
  //   return (
  //     <>
  //       <Overlay />
  //     </>
  //   );
  // }
  const {UserById} = useFollows()

  return (
    <Box
      backgroundColor={"#1A2421"}
      borderRadius={"lg"}
      px={"4"}
      py={"3"}
      width={"100%"}
    >
      <Text
        textTransform={"capitalize"}
        color={"white"}
        fontSize={"md"}
        fontWeight={"bold"}
      >
        my profile
      </Text>

      <Box display={"flex"} gap={"3"}>
        <Box
          w="100%"
          h="100px"
          borderRadius={"lg"}
          mt={"2"}
          bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            backgroundColor={"#1A2421"}
            borderRadius={"full"}
            padding={"3px"}
            position={"absolute"}
            bottom={"-6"}
            left={"2.5"}
          >
            <Avatar
              border={"2"}
              size={"md"}
              name={UserById?.full_name}
              src={UserById?.profile_picture}
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"end"} my={"3"}>
        <FollowButton name="edit Profile" />
      </Box>
      <Text
        textTransform={"capitalize"}
        color={"white"}
        fontSize={"md"}
        fontWeight={"bold"}
      >
        ✨{UserById?.full_name}✨
      </Text>
      <Text textTransform={"lowercase"} color={"gray"} fontSize={"xs"} px={"2"}>
        @{UserById?.username}
      </Text>
      <Text color={"white"} fontSize={"xs"} px={"2"}>
        {UserById?.profile_description}
      </Text>
      <Box display={"flex"} gap={"3"}></Box>
      <Box display={"flex"} mt={"3"}>
        <Box display={"flex"} alignItems={"center"}>
          <Text
            color={"white"}
            fontSize={"xs"}
            ps={"2"}
            pe={"1"}
            fontWeight={"bold"}
          >
            {UserById?.follows.length}
          </Text>
          <Text color={"gray"} fontSize={"xs"}>
            Following
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Text
            color={"white"}
            fontSize={"xs"}
            ps={"2"}
            pe={"1"}
            fontWeight={"bold"}
          >
            {UserById?.following.length}
          </Text>
          <Text color={"gray"} fontSize={"xs"}>
            Followers
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
