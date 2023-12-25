import { IoMdArrowRoundBack } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import DetailPostCard from "../../Components/Card/DetailPostCard";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../libs/api";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";



const MiddleSection = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userid = useAppSelector((state: any) => state.auth.id);
  const [post, setPost] = useState({
    caption: "",
    gambar: null,
    userId: userid
  });

  const { id } = useParams();
  const {data, refetch} = useQuery(["thread", id], async () => {
    try {
      const response = await api.get(`/threads/${id}`);
      return response.data.data;
    } catch (err) {
      console.log("", err);
    }
  },
  {
    onSuccess: ()=>{
      refetch()
    }
  }
  )
  

  const handleChange = (e: any) => {
    const { name, files, value } = e.target;
    setPost({
      ...post,
      [name]: files ? files[0] : value,
    });
    if (files) {
      setImage(URL.createObjectURL(files![0]));
    }
  };

  const handleImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  return (
    <div className="flex flex-col">
      <Box alignItems={"center"} gap={"2"} display={"flex"}>
        <Link to={"/"}>
        <IoMdArrowRoundBack className="text-white text-2xl" />
        </Link>
        <p className="text-lg text-white font-bold">Status</p>
      </Box>
      <DetailPostCard item={data} />
    </div>
  );
};

export default MiddleSection;
