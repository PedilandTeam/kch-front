import { usePathname, useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";

const DeleteFilterMobile = () => {
  const searchParams = useSearchParams();
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  const pathname = usePathname();
  const router = useRouter();

  const deleteAllCategoryHandler = () => {
    router.replace(pathname);
  };

  return (
    <button onClick={deleteAllCategoryHandler} className="w-full btn btn-neutral">
      حذف فیلترها
    </button>
  );
};
export default DeleteFilterMobile;
