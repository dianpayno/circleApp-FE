import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../libs/api";
import Overlay from "../Components/Overlay/Overlay";
import OverlayError from "../Components/Overlay/OverlayError";

export const ThreadsContext = createContext<any>([]);

export const useThreads = () => useContext(ThreadsContext);

const ThreadsProvider = ({ children }: any) => {
  const [threads, setThreads] = useState<any>([]);

  const { isLoading, isError, refetch: refetchThreads } = useQuery("threads", async () => {
    try {
      const response = await api.get("/threads");
      return setThreads(response.data.data);
    } catch (err) {
      throw new Error("Failed to fetch threads");
      console.log("", err);
    }
  });
  if (isLoading) {
    return <Overlay />;
  }
  if (isError) {
    return <OverlayError />;
  }

  return (
    <ThreadsContext.Provider value={{ threads, isLoading, isError, refetchThreads }}>
      {children}
    </ThreadsContext.Provider>
  );
};

export default ThreadsProvider;
