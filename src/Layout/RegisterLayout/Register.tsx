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
import { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import useRegister from "../../Hooks/UseRegister";

const Registerlayout = () => {
  const [show, setShow] = useState(false);

  const { form, handleChange, errorText, showToast, register } = useRegister();

 

  return (
    <Box
      backgroundColor={"#1B1B1B"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Box width={"25%"} display={"flex"} flexDirection={"column"} color={"white"}>
        <Text className="text-4xl text-green-600 font-bold">circle</Text>
        <Text className="text-2xl text-white font-bold">Join to Circle</Text>
        <Text fontSize={"xs"} color={"white"}>
          Let's connect with people all around the world
        </Text>

        {
            showToast ? (
              <Alert status="error"  display={"flex"} justifyContent={"center"} boxSize={"100%"} height={"40px"} fontSize={"sm"}  borderRadius={"md"} color={"red"} textTransform={"capitalize"}>
            
              <AlertIcon />
              {errorText}
              
                
            </Alert>
            ): null
          }

        <form onSubmit={register}>
          <Input
            fontSize={"sm"}
            size={"md"}
            borderRadius={"md"}
            placeholder="Full Name*"
            borderColor={"gray.600"}
            focusBorderColor="green.500"
            mt={"3"}
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
          />
          <Input
            fontSize={"sm"}
            size={"md"}
            borderRadius={"md"}
            placeholder="Username*"
            borderColor={"gray.600"}
            focusBorderColor="green.500"
            mt={"3"}
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            fontSize={"sm"}
            size={"md"}
            borderRadius={"md"}
            placeholder="Email*"
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

          <Button
            type="submit"
            w={"100%"}
            my={"3"}
            borderRadius={"md"}
            colorScheme="whatsapp"
          >
            Register
          </Button>
          <Box display={"flex"} justifyContent={"center"} gap={"1"}>
            <Text fontSize={"xs"}>
              By registering, you agree to privacy and policy
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registerlayout;
