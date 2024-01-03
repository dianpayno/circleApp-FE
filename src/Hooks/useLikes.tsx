import { useMutation } from "react-query";
import { useState } from "react";
import { api } from "../libs/api";
import { useThreads } from "../context/ThreadsContex";

type inputlikes = {
  userId: number;
  threadId: number;
};
const useLikes = () => {
  const { refetchThreads } = useThreads();
  const [like, setLike] = useState(false);

  const [inputlike, setinputLike] = useState<inputlikes>({
    userId: 0,
    threadId: 0,
  });

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  

  const { mutate: addLikes } = useMutation(
    async () => {
      try {
        const re = await api.post("/likes", inputlike, { headers });
        console.log(re);
        
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        {
          refetchThreads();
         
        }
      },
    }
  );
  const { mutate: deleteLikes } = useMutation(async (id: number) => {
    try {
      const re = await api.delete(`/likes/${id}`, { headers });
      
      console.log(re)
    } catch (err) {
      console.log(err);
    }
  },{
    onSuccess: () => {
      {
        setLike(false);
        refetchThreads();
       
      }
    },
  }
  );

  return {
    addLikes,
    deleteLikes,
    setinputLike,
    like,
    setLike,
    inputlike,
  };
};

export default useLikes;
