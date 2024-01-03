import { Box } from "@chakra-ui/react";
import StatusCard from "../../Components/Card/StatusCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getmyThreads } from "../../store/slice/ThreadSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useLocation } from "react-router-dom";
import {api }from "../../libs/api";

const MiddleProfile = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [SpesificThreads, setSpesificThreads] = useState([]);
  const { data } = useAppSelector((state: RootState) => state.thread);
  const specificUser = useAppSelector((state: RootState) => state.detailUser);
  const getSpesificThreads = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await api.get(`/userthreads/${specificUser?.id}`, {
        headers,
      });
      setSpesificThreads(res.data.data);
    } catch (error) {
      console.log("ini error", error);
    }
  };
  useEffect(() => {
    getSpesificThreads();
  }, [specificUser?.id]);

  useEffect(() => {
    dispatch(getmyThreads());
  }, []);

  return (
    <Box>
      <div className="flex flex-col">
        <p className="text-lg text-white font-bold">Threads</p>
        <div className="mt-10 flex  justify-start w-full ">
          <Box width={"90%"} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} alignItems={"center"}></Box>
          </Box>
        </div>
        {pathname.startsWith(`/profiles`) && SpesificThreads?.length > 0 ? (
          SpesificThreads?.map((item: any, index: number) => (
            <StatusCard key={index} data={item} />
          ))
        ): null}
          // <>
          //   <p className="text-md text-white font-bold text-center">
          //     No Threads
          //   </p>
          //   <p className="text-sm text-white font-bold text-center">
          //     Hit create a post to share your thought
          //   </p>
          // </>
        
      </div>
    </Box>
  );
};

export default MiddleProfile;
