import { Box, Text, Avatar } from "@chakra-ui/react";
import FollowButton from "../Button/FollowButton";
import { useEffect, useState } from "react";
import useFollows from "../../Hooks/useFollows";

const SuggestionCard = () => {
  const { followUser, unFollowUser, SuggestUser, dataFollowing } = useFollows();
  const [active, setActive] = useState<number>(-1);

  const handleFollow = (data: any, index: number) => {
    followUser(data);
    setActive(index);
  };
  const handleUnFollow = (data: any) => {
    unFollowUser(data);
    setActive(-1);
  }

  // useEffect(() => {
  //   if (dataFollowing) {
  //     setActive(-1);
  //   }
  // }, [dataFollowing]);

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
      {SuggestUser?.map((item: any, index: number) => {
        const data = {
          followingId: item.id,
        };
        const isactive = active === index;
        const sameData = dataFollowing?.filter((data: any) => {
          return data.user.id === SuggestUser?.[index].id;
        });

        const idFollows = dataFollowing?.filter((data: any) => {
          if (data.user.id === item.id) {
            return data;
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
            {isactive ? (
              // dataFollowing?.map ((data: any) => {
              //   return data.user.id === item.id ? (
              //     <FollowButton
              //       name="following"
              //       onClick={() => unFollowUser(item.id)}
              //     />
              //   ) : (
              //     <FollowButton
              //       name="follow"
              //       onClick={() => handleFollow(data)}
              //     />
              //   )
              // })
              <FollowButton
                name="following"
                onClick={() => handleUnFollow(idFollows?.[0]?.id)}
              />
            ) : (
              <FollowButton name="follow" onClick={() => handleFollow(data, index)} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SuggestionCard;
