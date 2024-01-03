import { useQuery, useMutation } from "react-query";
import { api } from "../libs/api";
import { useState } from "react";




const useFollows = () => {

  const [userId, setUserId] = useState<number>(0);



  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

const {data:dataFollowing, refetch:dataFollowingrefetch} = useQuery("following",
async ()=>{
  try{
    const response = await api.get("/following", { headers })
    return response.data.data
   
  }
  catch(error){
    console.log(error)
  }
  })

  const {data:dataFollowers}= useQuery("followers", 
  async ()=>{
    try {
      const res = await api.get("/followers", {headers})
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }
  )

 const {data:SuggestUser }= useQuery ("SuggestUser",
   async ()=>{
     try {
       const res = await api.get("/suggest", { headers });
       return res.data.data;
     } catch (error) {
       console.log("ini error", error);
     }
   }
 )
  

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
          // refecthAllUser();
        }
      },
    }
  );


  const { data: UserById, refetch: refetchUserbyId } = useQuery(
    "UserById",
    async () => {
      try {
        const res = await api.get(`/detailuser`, { headers });
        return res.data.data;
      } catch (error) {
        console.log("ini error", error);
      }
    },
    {
      onSuccess: () => {
        {
          // refecthAllUser();
        }
      },
    }
  );

const {data:getSpesificUser} = useQuery("getSpesificUser", async ()=>{
        try {
          if (userId !== 0) {
            const res = await api.get(`/detailusers/${userId}`, { headers });
            console.log(res.data.data)
            return res.data.data
          }
        } catch (error) {
          console.log("ini error", error);
        }
      })

 

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
          dataFollowingrefetch();
        }
      },
    }
  );

  const { mutate: unFollowUser } = useMutation(async (data: any) => {
    try {
      const res = await api.delete(`/follows/${data}`, { headers });
      console.log(res.data.data);
      // return res.data.data;

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
  return { 
    dataFollowers, getSpesificUser,setUserId, userId,
    dataAllUsers, refecthAllUser, followUser, unFollowUser, UserById, SuggestUser, dataFollowing, refetchUserbyId };
};

export default useFollows;
