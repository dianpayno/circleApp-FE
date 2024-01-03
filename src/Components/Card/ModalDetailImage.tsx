import { Image, Box } from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
type ImageProps = {
  image: any;
};
const ModalDetailImage = ({ image }: ImageProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const itemPerPage = 1;
  const startIndex = Math.min(imageIndex, image.length - itemPerPage);
  const endIndex = Math.min(imageIndex + itemPerPage);
  const visibleImage = image.slice(imageIndex, endIndex);
  const handleNext = () => {
    if (endIndex < image.length) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-2
    "
    >
      <div className="relative w-full flex justify-center items-center">
        {visibleImage?.map((item: any, index: number) => (
          <Image key={index} height={"350px"} borderRadius={"md"} src={item} />
        ))}

        {endIndex === image.length ? null : (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-slate-100 shadow-md rounded-full"
          >
            <MdKeyboardArrowRight size={30} color={"gray"} />
          </button>
        )}
        {startIndex === 0 ? null : (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-slate-100 shadow-md rounded-full"
          >
            <MdKeyboardArrowLeft size={30} color={"gray"} />
          </button>
        )}
      </div>

      <div className="flex gap-1">
        {image.map((item: any, index: number) => {
          const active = index === imageIndex;
          return (
            <Box border={`${active ? "1px solid gray" : null}`} borderRadius={"md"} p={1}>
              <Image
                key={index}
                boxSize={"40px"}
                borderRadius={"md"}
                objectFit={"cover"}
                src={item}
              />
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default ModalDetailImage;
