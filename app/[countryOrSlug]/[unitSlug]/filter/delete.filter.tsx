import { usePathname, useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";

const DeleteFilter = () => {
  const searchParams = useSearchParams();
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  const ENABELED =
    (!!citiesInQuery && citiesInQuery.length > 0) ||
    (!!categoriesInQuery && categoriesInQuery.length > 0);

  const pathname = usePathname();
  const router = useRouter();

  const deleteAllCategoryHandler = () => {
    router.replace(pathname);
  };

  return (
    <button
      onClick={deleteAllCategoryHandler}
      className={`w-full btn btn-primary btn-outline ${
        !ENABELED ? "btn-disabled" : ""
      } sm:w-auto`}
    >
      حذف فیلترها
    </button>
  );
};
export default DeleteFilter;
