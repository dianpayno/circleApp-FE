import { IoMdArrowRoundBack } from "react-icons/io";
import { Box } from "@chakra-ui/react";
import DetailPostCard from "../../Components/Card/DetailPostCard";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../libs/api";
import { useParams } from "react-router-dom";

const MiddleSection = () => {
  const { id } = useParams();
  const { data, refetch:threadByIdRefetch } = useQuery(
    ["thread", id],
    async () => {
      try {
        const response = await api.get(`/threads/${id}`);
        return response.data.data;
      } catch (err) {
        console.log("", err);
      }
    },
    {
      onSuccess: () => {
        threadByIdRefetch();
      },
    }
  );

  return (
    <div className="flex flex-col">
      <Box alignItems={"center"} gap={"2"} display={"flex"}>
        <Link to={"/"}>
          <IoMdArrowRoundBack className="text-white text-2xl" />
        </Link>
        <p className="text-lg text-white font-bold">Status</p>
      </Box>
      <DetailPostCard item={data} refetchThreadsById={threadByIdRefetch} />
    </div>
  );
};

export default MiddleSection;
