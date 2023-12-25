import { BiSolidHomeCircle } from "react-icons/bi";
import { TbUserSearch } from "react-icons/tb";
import { IoHeartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import ButtonAuth from '../../Components/Button/ButtonAuth'
import { useNavigate } from "react-router-dom";


import { useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../store/slice/authSlice";



type Props = {
  scrolled?: boolean;
}

const LeftSection = (props: Props) => {

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(USER_LOGOUT());
  }

  const login = () => {
    navigate("/login");
  }
  const menu = [
    {
      id: 1,
      name: "Home",
      icon: <BiSolidHomeCircle className="text-white text-2xl" />,
      link: "/",
    },
    {
      id: 2,
      name: "Search",
      icon: <TbUserSearch className="text-white text-2xl" />,
      link: "/search",
    },
    {
      id: 3,
      name: "Follows",
      icon: <IoHeartOutline className="text-white text-2xl" />,
    },
    {
      id: 4,
      name: "Profile",
      icon: <CgProfile className="text-white text-2xl" />,
    },
  ];
  return (
    <div className={`${props.scrolled ? "fixed top-0 left-0 bottom-0 z-10" : "sticky top-0 left-0 right-0 bottom-0"} py-5 px-12 flex flex-col justify-start`}>
      <p className="text-3xl text-green-500 font-bold">circle</p>

      <div className="mt-10">
        {menu.map((item: any) => {
          return (
            <Link key={item.id} to={item.link}>
              <div className="flex items-center gap-3 my-6">
                {item.icon}
                <p className="text-white text-sm font-semibold">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 ">
        {
          token?
      <Button colorScheme='whatsapp'
      borderRadius={"full"}
      px={"10"}
      size='sm'>
    Create a Post
  </Button>: 
  <Link to={"/register"}>
  <Button colorScheme='whatsapp'
      borderRadius={"full"}
      px={"10"}
      size='sm'>
    Connect with Circle
  </Button>
  </Link>
        }

  <div className="mt-28">
      {
        token?
        <ButtonAuth onClick={logout} type="logout" />:
      <ButtonAuth onClick={login} type="login" />
      }

  </div>
     
      </div>
    </div>
  );
};

export default LeftSection;
