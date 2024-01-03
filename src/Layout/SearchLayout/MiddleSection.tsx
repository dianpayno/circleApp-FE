import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Avatar,
    Text,
} from "@chakra-ui/react";
import { MdPersonSearch } from "react-icons/md";
import  useFollows  from "../../Hooks/useFollows";
import { useState } from "react";
import { Link } from "react-router-dom";

const MiddleSection = () => {
    const [search, setSearch] = useState("");
    const {dataAllUsers}=useFollows()
   const findUser = dataAllUsers?.filter((item:any)=>{
       if(search === ""){
           return item
       }else if(item.full_name.toLowerCase().includes(search.toLowerCase())){
           return item
       }
   })
  return (
    <>
    <Box mt={"5"}>
      <InputGroup
      color={"white"}

      >
        <InputLeftElement pointerEvents="none">
          <MdPersonSearch  size={25} />
        </InputLeftElement>
        <Input type="text" 
        fontSize={"xs"}
        onChange={(e)=>setSearch(e.target.value)}
        focusBorderColor="green.500"
        borderRadius={"lg"}
        className=" p-2 text-xs placeholder:text-xs"
        placeholder="Find People" />
      </InputGroup>
    </Box>
    {
        findUser?.map((item:any, index:number)=>{
            return(

    <Box key={index} className="bg-[#1A2421] w-full mt-2 rounded-xl px-3 py-[2px] text-white">
      <Link to={`/profiles/${item.id}`}>
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
        name={item.full_name}
        src={item.avatar}
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
        <Text color={"gray"} fontSize={"xs"} textTransform={"lowercase"}>
          @{item.username}
        </Text>
        <Text className="text-xs text-gray-500">
         {item.bio}
        </Text>
      </Box>
    </Box>
      {/* {
        !isactive? (
          <FollowButton name="following"
          onClick={()=>handleFollowingButton(index, dataFollowing.id)}
          />
          
        ):
    <FollowButton name="follow"
    onClick={()=>handleFollowbutton(data)}
    />
      } */}

  </Box>
  </Link>
    </Box>
            )
            
        })
    }
    </>
  );
};

export default MiddleSection;
