import FollowButton from "../Button/FollowButton";
import useFollows from "../../Hooks/useFollows";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
type Props = {
  dataFollowers?: any;
  index?: number;
};

const FollowsCard = ({ dataFollowers, index }: Props) => {
  const { followUser, unFollowUser } = useFollows();
  const [isFollowing, setIsFollowing] = useState(false);
  // const isactive = active === index;
  const data = {
    followingId: dataFollowers.userId,
  };

  useEffect(() => {
    if (dataFollowers.isFollowing) {
      setIsFollowing(true);
    }
  });

  const handleFollowingButton = (id: any) => {
    unFollowUser(id);
  };

  const handleFollowbutton = (data: any) => {
    setIsFollowing(true);
    followUser(data);
  };

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
          name={dataFollowers.user.full_name}
          src={dataFollowers.user.profile_picture}
        />
        <Box>
          <Box className="flex items-center gap-2">
            <Text
              color={"white"}
              fontSize={"xs"}
              textTransform={"capitalize"}
              fontWeight={"bold"}
            >
              {dataFollowers.user.full_name}
            </Text>
            {isFollowing ? null : (
              <Text
                onClick={() => handleFollowbutton(data)}
                className="text-xs text-blue-300 cursor-pointer"
              >
                Follow
              </Text>
            )}
          </Box>
          <Text color={"gray"} fontSize={"xs"} textTransform={"lowercase"}>
            @{dataFollowers.user.username}
          </Text>
          <Text color={"white"} fontSize={"xs"}>
            {dataFollowers.user.profile_description}
          </Text>
        </Box>
      </Box>
      <FollowButton
        onClick={() => handleFollowingButton(dataFollowers.id)}
        name="Remove"
      />
    </Box>
  );
};

export default FollowsCard;
