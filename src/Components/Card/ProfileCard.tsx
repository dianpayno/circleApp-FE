import {
  Box,
  Text,
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FollowButton from "../Button/FollowButton";
import useFollows from "../../Hooks/useFollows";
import EditProfileCard from "./EditProfileCard";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";

const ProfileCard = () => {
  const { UserById } = useFollows();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const getSpesificUser = useAppSelector(
    (state: RootState) => state.detailUser
  );
  const { unFollowUser, followUser } = useFollows();
  const [spesificUser, setSpesificUser] = useState<boolean>(false);
  useEffect(() => {
    if (pathname.startsWith("/profiles")) {
      setSpesificUser(true);
    } else {
      setSpesificUser(false);
    }
  }, [pathname]);



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
          bgGradient={`${
            getSpesificUser?.cover_picture && UserById?.cover_picture
              ? null
              : "linear(to-r, gray.300, yellow.400, pink.200)"
          }`}
          backgroundImage={
            spesificUser
              ? getSpesificUser?.cover_picture
              : UserById?.cover_picture
              ? UserById?.cover_picture
              : null
          }
          backgroundPosition={"cover"}
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
              name={
                spesificUser ? getSpesificUser.full_name : UserById?.full_name
              }
              src={
                spesificUser
                  ? getSpesificUser.profile_picture
                  : UserById?.profile_picture
              }
            />
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"end"} my={"3"}>
        {spesificUser ? (
          <>
            <FollowButton
            onClick={getSpesificUser?.isFollowing ?()=> unFollowUser :()=> followUser}
              name={`${getSpesificUser?.isFollowing ? "following" : "follow"}`}
            />
          </>
        ) : (
          <FollowButton onClick={onOpen} name="edit Profile" />
        )}
      </Box>
      <Text
        textTransform={"capitalize"}
        color={"white"}
        fontSize={"md"}
        fontWeight={"bold"}
        px={"2"}
      >
        {spesificUser ? getSpesificUser?.full_name : UserById?.full_name}
      </Text>
      <Text textTransform={"lowercase"} color={"gray"} fontSize={"xs"} px={"2"}>
        @{spesificUser ? getSpesificUser?.username : UserById?.username}
      </Text>
      <Text color={"white"} fontSize={"xs"} px={"2"}>
        {spesificUser
          ? getSpesificUser?.profile_description
          : UserById?.profile_description}
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
            {spesificUser ? getSpesificUser?.follows : UserById?.follows}
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
            {spesificUser ? getSpesificUser?.following : UserById?.following}
          </Text>
          <Text color={"gray"} fontSize={"xs"}>
            Followers
          </Text>
        </Box>
      </Box>

      <Modal
        blockScrollOnMount={false}
        size={"lg"}
        isCentered
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg={"#1A2421"} color={"white"}>
          <ModalHeader>
            <Text
              textTransform={"capitalize"}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              Edit Profile
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfileCard onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileCard;
