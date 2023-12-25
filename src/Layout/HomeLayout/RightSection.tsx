import { Box } from "@chakra-ui/react";
import ProfileCard from "../../Components/Card/ProfileCard";
import SugesstionCard from "../../Components/Card/SuggestionCard";
import FooterCard from "../../Components/Card/FooterCard";
import { useEffect, useState } from "react";

const RightSection = () => {
  const [isToken, setIsToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    setIsToken(true);
  }
}, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      padding={"5"}
      color={"white"}
    >
      {isToken ? 
      <>
      <ProfileCard /> 
      <SugesstionCard />
      </>
      : null}
     
      <FooterCard />
    </Box>
  );
};

export default RightSection;
