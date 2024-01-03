import { BiSolidHomeCircle } from "react-icons/bi";
import { TbUserSearch } from "react-icons/tb";
import { IoHeartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import ButtonAuth from "../../Components/Button/ButtonAuth";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../store/slice/authSlice";
import { useLocation } from "react-router-dom";

import PostCard from "../../Components/Card/PostCard";

type Props = {
  scrolled?: any;
};

const LeftSection = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(USER_LOGOUT());
  };

  const login = () => {
    navigate("/login");
  };
  const menu = [
    {
      id: 1,
      name: location.pathname === "/" ? (
        <p className="text-green-500 font-bold text-md">Home</p>
      ):(
        <p className="text-white font-bold text-md">Home</p>
      ),
      icon:
        location.pathname === "/" ? (
          <BiSolidHomeCircle className="text-green-500 text-2xl" />
        ) : (
          <BiSolidHomeCircle className="text-white text-2xl" />
        ),
      link: "/",
    },
    {
      id: 2,
      name: 
      location.pathname === "/search" ? (
        <p className="text-green-500 font-bold text-md">Search</p>
      ):(
        <p className="text-white font-bold text-md">Search</p>
      )
    ,
      icon:
        location.pathname === "/search" ? (
          <TbUserSearch className="text-green-500 text-2xl" />
        ) : (
          <TbUserSearch className="text-white text-2xl" />
        ),
      link: "/search",
    },
    {
      id: 3,
      name: location.pathname === "/follows" ? (
        <p className="text-green-500 font-bold text-md">Follows</p>
      ):(
        <p className="text-white font-bold text-md">Follows</p>
      ),
      icon:
        location.pathname === "/follows" ? (
          <IoHeart className="text-green-500 text-2xl" />
        ) : (
          <IoHeartOutline className="text-white text-2xl" />
        ),
      link: "/follows",
    },
    {
      id: 4,
      name: location.pathname === "/profile" ? (
        <p className="text-green-500 font-bold text-md">Profile</p>
      ):(
        <p className="text-white font-bold text-md">Profile</p>
      ),
      icon:
        location.pathname === "/profile" ? (
          <CgProfile className="text-green-500 text-2xl" />
        ) : (
          <CgProfile className="text-white text-2xl" />
        ),
      link: "/profile",
    },
  ];
  return (
    <div
      className={`${
        props.scrolled
          ? "fixed top-0 left-0 bottom-0 z-10"
          : "sticky top-0 left-0 right-0 bottom-0"
      } py-5 px-12 flex flex-col justify-start`}
    >
      <p className="text-3xl text-green-500 font-bold">circle</p>

      <div className="mt-10">
        {menu.map((item: any) => {
          return (
            <Link key={item.id} to={item.link}>
              <div className="flex items-center gap-3 my-6">
                {item.icon}
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 ">
        {token ? (
          <Button
            colorScheme="whatsapp"
            borderRadius={"full"}
            px={"10"}
            onClick={onOpen}
            size="sm"
          >
            Create a Post
          </Button>
        ) : (
          <Link to={"/register"}>
            <Button
              colorScheme="whatsapp"
              borderRadius={"full"}
              px={"10"}
              size="sm"
            >
              Connect with Circle
            </Button>
          </Link>
        )}

        <div className="mt-28">
          {token ? (
            <ButtonAuth onClick={logout} type="logout" />
          ) : (
            <ButtonAuth onClick={login} type="login" />
          )}
        </div>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={"white"} borderRadius={"lg"} p={"2"}>
            <ModalCloseButton color={"black"} />
            <PostCard close={onClose} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default LeftSection;
