import { useMutation } from "react-query"
import { api } from "../libs/api"
import {useAppSelector} from "../store/hooks";
import { useState } from "react";
import { RootState } from "../store/store";
import { useThreads } from "../services/ThreadsContex";

type post = {
    content: string;
    image: string;
    userId: number;
  }
const useThreadss = () => {
    const user = useAppSelector((state:RootState) => state.auth);
    const [image, setImage] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { refetchThreads } = useThreads();
    const [data, setData] = useState<post>({
        content: "",
        image: "",
        userId: 0,
      });

      const handleChange = (e: any) => {
        const { name, value} = e.target;
        setData({
          ...data,
          userId:user.id,
          [name]:value,
        });
       
      };
      const { mutate: addPost } = useMutation(
        async (e: any) => {
          e.preventDefault();
          try {
            await api.post("/threads", data);
          } catch (err) {
            console.log(err);
          }
        },
        {
          onSuccess: () => {
            refetchThreads();
            setIsOpen(false);
            setData({
              content: "",
              image: "",
              userId: user.id,
            });
          },
        }
      );
      return {
        data,
        setData,
        handleChange,
        image,
        setImage,
        isOpen,
        setIsOpen,
        addPost,
      }
    
    }


    export default useThreadss