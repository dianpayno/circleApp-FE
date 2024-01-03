import {Box, Image}from "@chakra-ui/react"
type Props = {
    dataImage : any
};

const GridLayout3 = ({dataImage}: Props) => {
  return (
    <Box className="grid grid-rows-4 grid-flow-col w-full h-[400px] gap-1">
    {dataImage.map((item: any, index: any) => {
      return (
      
          <Box
            className={`${index === 0 && "row-span-4"}
          ${index === 1 && "row-span-2"}
          ${index === 2 && "row-span-2"}
          col-span-1 w-[full]`}
            key={index}
          >
            <Image src={item} className="w-full h-full object-cover" />
          </Box>
      
      );
    })}
  </Box>
    
  )
}

export default GridLayout3