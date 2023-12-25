import { useQuery, useMutation } from "react-query";
import { api } from "../libs/api";
import { useSelector } from "react-redux";



const useFollows = () => {
  const user = useSelector((state: any) => state.auth);



  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const {
    data: dataAllUsers,
    refetch:refecthAllUser
  } = useQuery(
    "follows",
    async () => {
      try {
        const res = await api.get("/users", { headers });
       
        return res.data.data;
    
      } catch (error) {
        console.log("ini error", error);
      }
    },
    {
      onSuccess: () => {
        {
          refecthAllUser();
        }
      },
    }
  );


  const { data: UserById, refetch: refetchUserbyId } = useQuery(
    ["UserById", user?.id],
    async () => {
      try {
        const res = await api.get(`/users/${user?.id}`, { headers });
      
        return res.data.data;
      } catch (error) {
        console.log("ini error", error);
      }
    },
    {
      onSuccess: () => {
        {
          refecthAllUser();
        }
      },
    }
  );

  const { mutate: followUser } = useMutation(
    async (data: any) => {
      try {
        const res = await api.post("/follows", data, { headers });
        return res.data.data;
      } catch (error) {
        console.log("ini error", error);
      }
    },
    {
      onSuccess: () => {
        {
          refecthAllUser();
          refetchUserbyId();
          console.log("add success");
        }
      },
    }
  );

  const { mutate: unFollowUser } = useMutation(async (data: any) => {
    try {
      const res = await api.delete(`/follows/${data}`, { headers });
      return res.data.data;
    } catch (error) {
      console.log("ini error", error);
    }
  },{
    onSuccess: () => {
      {
        refecthAllUser();
        refetchUserbyId();
  
      }
    }
  });
  return { dataAllUsers, refecthAllUser, followUser, unFollowUser, UserById };
};

export default useFollows;
