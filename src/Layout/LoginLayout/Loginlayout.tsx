import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import uselogin from "../../Hooks/useLogin";

const Loginlayout = () => {
  const [show, setShow] = useState(false);
  const { form, handleChange, login, errText, showToast } = uselogin();

  return (
    <Box
      backgroundColor={"#1B1B1B"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Box width={"25%"} display={"flex"} flexDirection={"column"}>
        <Text className="text-4xl text-green-600 font-bold">circle</Text>
        <Text className="text-2xl text-white font-bold">Login to Circle</Text>

        <Box width={"100%"} my={"5"} color={"white"}>
          {
            showToast ? (
              <Alert status="error"  display={"flex"} justifyContent={"center"} boxSize={"100%"} height={"40px"} fontSize={"sm"}  borderRadius={"md"} color={"red"} textTransform={"capitalize"}>
            
              <AlertIcon />
              {errText}
              
                
            </Alert>
            ): null
          }
          <form onSubmit={login}>
            <Input
              fontSize={"sm"}
              size={"md"}
              borderRadius={"md"}
              placeholder="Email/Username*"
              borderColor={"gray.600"}
              focusBorderColor="green.500"
              mt={"3"}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <InputGroup size="md" my={"3"}>
              <Input
                fontSize={"sm"}
                size={"md"}
                borderRadius={"md"}
                borderColor={"gray.600"}
                focusBorderColor="green.500"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password*"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <InputRightElement width="2rem">
                {show ? (
                  <FaRegEyeSlash onClick={() => setShow(false)} />
                ) : (
                  <FaRegEye onClick={() => setShow(true)} />
                )}
              </InputRightElement>
            </InputGroup>
            <Text fontSize={"xs"} textAlign={"right"}>
              Forgot password?
            </Text>
            <Button
              type="submit"
              w={"100%"}
              my={"3"}
              borderRadius={"md"}
              colorScheme="whatsapp"
            >
              Login
            </Button>
            <Box display={"flex"} justifyContent={"center"} gap={"1"}>
              <Text fontSize={"xs"}>Don't have an account yet?</Text>
              <Text fontSize={"xs"}>Sign up</Text>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Loginlayout;
