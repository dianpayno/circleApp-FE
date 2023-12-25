import { Box, Text, Image } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

import Logo from "../../assets/logohaeader.png"

const FooterCard = () => {
  return (
    <Box
      backgroundColor={"#1A2421"}
      borderRadius={"lg"}
      px={"4"}
      py={"3"}
      mb={"5"}
      width={"100%"}
    >
      <Box display={"flex"}>
        <Text
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          fontSize={"xs"}
          fontWeight={"bold"}
          mr={"2"}
        >
          Developed by Your Name
        </Text>
        <Box display={"flex"} alignItems={"center"} gap={"2"}>
          <FaGithub />
          <FaFacebook />
          <FaLinkedin />
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Text
          color={"white"}
          fontSize={"xs"}
          textTransform={"capitalize"}
          mr={"1"}
        >
          powered by
        </Text>
        <Image
          boxSize="15px"
          objectFit="cover"
          src={Logo}
          alt="Dan Abramov"
        />
         <Text
          color={"white"}
          fontSize={"xs"}
          textTransform={"capitalize"}
          ms={"1"}
        >
          Dumbways Indonesia . #1CodingBootCamp
        </Text>
      </Box>
    </Box>
  );
};

export default FooterCard;
