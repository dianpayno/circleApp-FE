
import { api } from "../../libs/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { SAVE_DATA_USER } from "../../store/slice/visitUserSlice";
import MiddleProfile from "../Profile/MiddleProfile";

const VisitOtherProfileLayout = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
const getDataUser =  async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await api.get(`/detailusers/${id}`, { headers });
      dispatch(SAVE_DATA_USER(res.data.data));
      return res.data.data;
    } catch (error) {
      console.log("ini error", error);
    }
  };

  useEffect(() => {
    getDataUser();  
  },[])


  return (
    <div>
     <MiddleProfile/>
    </div>
  );
};

export default VisitOtherProfileLayout;
