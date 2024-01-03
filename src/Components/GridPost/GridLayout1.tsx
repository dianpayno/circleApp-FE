import { Box, Image } from "@chakra-ui/react";

type Props = {
dataImage: any

};

const GridLayout1 = ({dataImage}: Props) => {
  return (
    <Box className="grid grid-rows-4 grid-flow-col w-full h-[350px] gap-1">
    {dataImage.map((item: any, index: any) => {
      return (
        <Box className="row-span-4" key={index}>
          <Image src={item} className="w-full h-full object-cover" />
        </Box>
      );
    })}
  </Box>
  )
}

export default GridLayout1