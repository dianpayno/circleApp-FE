import { Box, Text, Avatar } from "@chakra-ui/react";
import FollowButton from "../Button/FollowButton";
import { useEffect, useState } from "react";
import useFollows from "../../Hooks/useFollows";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";
import { getAllUser } from "../../store/slice/dataUserSlice";

type dataInput = {
  userId: number;
  followingId: number;
};
const SuggestionCard = () => {
  const { followUser, unFollowUser, dataAllUsers, refecthAllUser } = useFollows();

  const [data, setData] = useState<any>([]);

  const user = useAppSelector((state: RootState) => state.auth);
  // const dispatch = useAppDispatch();
  // const allUsers = useAppSelector(
  //   (state: RootState) => state.dataUser.data?.data
  // );

  useEffect(() => {
    console.log(dataAllUsers);
    
  })


  useEffect(() => {
    const filterUser = dataAllUsers?.filter((item: any) => item.id !== user.id);
    const getNotFollowing = filterUser?.filter((item: any) => {
      const contains = item.following?.map((data: any) => data.userId);
      if (contains?.includes(user.id) === false) {
        return item;
      }
    });
    setData(getNotFollowing);
  }, [dataAllUsers,refecthAllUser,user.id]);
 



  return (
    <Box
      backgroundColor={"#1A2421"}
      borderRadius={"lg"}
      px={"4"}
      py={"3"}
      my={"5"}
      width={"100%"}
    >
      <Text color={"white"} fontSize={"md"} fontWeight={"bold"}>
        Suggestion for you
      </Text>
      {dataAllUsers?.map((item: any) => {
        const follows: dataInput = {
          userId: user.id,
          followingId: item.id,
        };
        const isFollowed = item.following?.filter((item: any) => {
          if (item.userId === user.id) {
            return item;
          }
        });

        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"2"}
            my={"3"}
            key={item.id}
          >
            <Box display={"flex"} alignItems={"center"} gap={"2"}>
              <Avatar
                size="sm"
                name={item.full_name}
                src={item.profile_picture}
              />
              <Box>
                <Text
                  color={"white"}
                  fontSize={"xs"}
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                >
                  {item.full_name}
                </Text>
                <Text
                  color={"gray"}
                  fontSize={"xs"}
                  textTransform={"lowercase"}
                >
                  @{item.username}
                </Text>
              </Box>
            </Box>
            {isFollowed.length > 0 ? (
              <FollowButton
                name="following"
                onClick={() => unFollowUser(isFollowed[0].id)}
              />
            ) : (
              <FollowButton name="follow" onClick={() => followUser(follows)} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SuggestionCard;
