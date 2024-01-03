import { Box, Image, Button } from "@chakra-ui/react"
import useThreadss from "../../Hooks/useThreadss";
import { useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";

type Props = {
    close: () => void
}
const PostCard = ({close}: Props) => {
    const imageRef = useRef<HTMLInputElement>(null);

  const {
    handleChange,
    imagesPreviews,
    setImagesPreviews,
    handleChangeImage,
    data,
    addPost,
    progress
  } = useThreadss();
  const handleImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <div>
    <form onSubmit={addPost}>
    <textarea
      autoFocus
      onChange={handleChange}
      name="content"
      value={data.content}
      rows={3}
      className="text-sm focus:border-none focus:outline-none p-3 w-full resize-none"
      placeholder="What is happening?"
    />
    <Box
      className={`flex items-center 
      justify-between
     py-3 px-3 w-full`}
    >
      <Box display={"flex"} gap={"1"} alignItems={"center"}>
        {imagesPreviews.length > 0 ? (
          imagesPreviews.map((item: any, index: number) => (
            <Box className="relative" key={index}>
              <IoCloseCircle 
              onClick={() =>{
                const newImagePreviews =[...imagesPreviews]
                newImagePreviews.splice(index, 1)
                setImagesPreviews(newImagePreviews)

              }}
              className="absolute top-[-10px] right-[-10px] text-xl cursor-pointer"></IoCloseCircle>
              <Image
                boxSize={"40px"}
                objectFit={"cover"}
                borderRadius={"sm"}
                src={item}
                ml={"3px"}
                alt="mage"
              />
            </Box>
          ))
        ) : (
          <MdAddPhotoAlternate
            onClick={handleImage}
            size={25}
            className="text-green-500"
          />
        )}
      </Box>

      <Box>
        <input
          onChange={handleChangeImage}
          name="gambar"
          ref={imageRef}
          type="file"
          hidden
          multiple
        />
        <Box display={"flex"} gap={"1"} alignItems={"center"}>
          <Button
          onClick={close}
            colorScheme="whatsapp"
            borderRadius={"lg"}
            size={"sm"}
            px={"3"}
            py={"3"}
            fontSize={"xs"}
            type="submit"
            isLoading={progress>0}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  </form>

    </div>
  )
}

export default PostCard