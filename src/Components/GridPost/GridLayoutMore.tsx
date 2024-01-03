import { Box, Image } from "@chakra-ui/react"

type Props = {
    dataImage : any
}
const GridLayoutMore = ({dataImage}:Props) => {
    
  return (
    <Box className="grid grid-rows-4 grid-col-6 w-full h-[350px] gap-1">
    {dataImage.slice(0,4).map((item: any, index: any) => {
      return (
        <Box
          key={index}
          className={`
          ${index === 0 && "row-span-2 col-span-6"}
          ${index === 1 && "row-span-2 col-span-2"}
          ${index === 2 && "row-span-2 col-span-2"}
          ${index === 3 && "row-span-2 col-span-2"}
          relative
        `}
        >
          <Image
            src={item}
            alt="gambar"
            className="w-full h-full object-cover"
          />
          {index === 3 ? (
            <div className="bg-black opacity-70 absolute top-0 bottom-0 left-0 right-0 display flex items-center justify-center">
              <p className="text-white text-xs">
                View {dataImage.length - 4} more
              </p>
            </div>
          ) : null}
        </Box>
      );
    })}
  </Box>
  )
}

export default GridLayoutMore