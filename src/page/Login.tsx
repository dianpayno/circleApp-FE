import { Box } from "@chakra-ui/react";
import Loginlayout from "../Layout/LoginLayout/Loginlayout";
import { useEffect } from "react";

const Login = () => {
 useEffect(() => {
   const title = "Cirlcle App | Login";
   document.title = title;
 })

  return (
    <Box>
      <Loginlayout />
    </Box>
  );
};

export default Login;
