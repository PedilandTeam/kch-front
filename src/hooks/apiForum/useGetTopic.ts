import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";

function useGetTopic() {
  const url = `https://api.koochaa.com/forum/topics?limit=30&page=1"`;
  const { data, isLoading, mutate, error } = useSWR(url, fetcher);
  return { data, isLoading, mutate, error };
}

export default useGetTopic;

// useEffect(() => {
//     const fetchData = () => {
//       fetch("https://api.koochaa.com/forum/topics?limit=30&page=1", {
//         credentials: "include",
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           setTopics(result.items);
//         })
//         .catch((err) => console.error(err));
//     };

//     fetchData();
//   }, []);
