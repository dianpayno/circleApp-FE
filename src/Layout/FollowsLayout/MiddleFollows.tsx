import {
  Tabs,
  TabList,
  Box,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import FollowsCard from "../../Components/Card/FollowsCard";
import useFollows from "../../Hooks/useFollows";
import FollowingCard from "../../Components/Card/FollowingCard";
import { useEffect } from "react";

const MiddleFollows = () => {
    const {dataFollowers}=useFollows()
    const {dataFollowing}=useFollows()

    useEffect (() => {
        console.log(dataFollowers)
        
    }, [dataFollowers])

  return (
    <>
      <Box>
        <p className="text-white text-xl font-bold mb-2">Follows</p>
      </Box>
      <Tabs position="relative" variant="unstyled" className="text-white text-md font-semibold">
        <TabList>
            <Tab width={"50%"}>Followers</Tab>
            <Tab width={"50%"}>Followings</Tab>
          
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
 
         {
                dataFollowers?.map((item:any, index:number)=>{
                    return(
                        <FollowsCard key={index} dataFollowers={item}/>

                    )
                })
            }
          </TabPanel>
          <TabPanel>
          {
                dataFollowing?.map((item:any, index:number)=>{
                    return(
                        <FollowingCard key={index} dataFollowing={item} index={index}/>

                    )
                })
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MiddleFollows;
