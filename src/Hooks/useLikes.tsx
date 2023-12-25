import { useMutation } from "react-query";
import { useState } from "react";
import { api } from "../libs/api";
import { useThreads } from "../services/ThreadsContex";

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

  const { mutate: addLikes } = useMutation(
    async () => {
      try {
        await api.post("/likes", inputlike);
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
      await api.delete(`/likes/${id}`);
    } catch (err) {
      console.log(err);
    }
  },{
    onSuccess: () => {
      {
        refetchThreads();
        setLike(false);
       
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
