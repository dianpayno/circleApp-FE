import { Input, Box, Avatar, Image, ModalFooter } from "@chakra-ui/react";
import { useRef } from "react";
import { FcAddImage } from "react-icons/fc";
import useEditProfile from "../../Hooks/useEditProfile";
import Button from "../Button/Button";
import { IoMdImages } from "react-icons/io";

type Props = {
  onClose: () => void;
};

const EditProfileCard = ({ onClose }: Props) => {
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const {
    handleChange,
    imagesPreviews,
    handleChangeAvatar,
    handleChangeCover,
    coverPreviews,
    data,
    editProfile,
  } = useEditProfile();

  const handleClickAvatar = () => {
    if (avatarRef.current) avatarRef.current.click();
  };
  const handleClickCover = () => {
    if (coverRef.current) coverRef.current.click();
  };
  return (
    <Box>
      <form onSubmit={editProfile}>
        <label className="text-sm">Your Name</label>
        <Input
          name="full_name"
          fontSize={"sm"}
          size={"sm"}
          variant={"filled"}
          borderRadius={"md"}
          focusBorderColor="green.500"
          className="focus:text-white"
          onChange={handleChange}
          mb={"2"}
          value={data.full_name}
          color={"black"}
        />

        <label className="text-sm">Username</label>
        <Input
          name="username"
          fontSize={"sm"}
          size={"sm"}
          borderRadius={"md"}
          variant={"filled"}
          onChange={handleChange}
          focusBorderColor="green.500"
          mb={"2"}
          value={data.username}
          color={"black"}
          className="focus:text-white"
        />

        <label className="text-sm">Bio</label>
        <Input
          name="profile_description"
          fontSize={"sm"}
          size={"sm"}
          borderRadius={"md"}
          variant={"filled"}
          onChange={handleChange}
          focusBorderColor="green.500"
          className="focus:text-white"
          color={"black"}
          mb={"2"}
          value={data.profile_description}
        />
        <label className="text-sm">Change Avatar</label>
        <input
          onChange={handleChangeAvatar}
          ref={avatarRef}
          hidden
          type="file"
        />
        <Box display={"flex"} gap={"2"} mb={"3"} alignItems={"center"}>
          <Avatar
            className="w-12 h-12 rounded-full"
            src={imagesPreviews}
            name="image"
          />
          <IoMdImages
          cursor={"pointer"}
          size={30}
          onClick={handleClickAvatar} />
        </Box>
        <label className="text-sm">Change Cover Photo</label>
        <input onChange={handleChangeCover} ref={coverRef} type="file" hidden />
        <IoMdImages
          cursor={"pointer"}
          size={30}
          onClick={handleClickCover} />
        {coverPreviews ? (
          <Image boxSize={"60%"} borderRadius={"md"} src={coverPreviews} />
        ) : null}
        <ModalFooter>
          <Button
            type="submit"
            onClick={onClose}
            name="Save Changes"
            size="small"
          />
        </ModalFooter>
      </form>
    </Box>
  );
};

export default EditProfileCard;
