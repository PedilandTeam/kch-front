import { fetcher } from "@/swr/fetcher";
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
//           // console.log(result.items);
//           setTopics(result.items);
//         })
//         .catch((error) => console.error(error));
//     };

//     fetchData();
//   }, []);
