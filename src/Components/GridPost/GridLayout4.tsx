import {Box, Image}from "@chakra-ui/react"

type Props = {
    dataImage: any
}

const GridLayout4 = ({dataImage}: Props) => {
  return (
    <Box className="grid grid-rows-4 grid-col-6 w-full h-[350px] gap-1">
    {dataImage.map((item: any, index: any) => {
      return (
        <Box
          key={index}
          className={`
          ${index === 0 && "row-span-2 col-span-2"}
          ${index === 1 && "row-span-2 col-span-2"}
          ${index === 2 && "row-span-2 col-span-2"}
          ${index === 3 && "row-span-2 col-span-6"}
        `}
        >
          <Image
            src={item}
            alt="gambar"
            className="w-full h-full object-cover"
          />
        </Box>
      );
    })}
  </Box>
  )
}

export default GridLayout4