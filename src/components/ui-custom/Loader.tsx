import { Spinner } from "../ui/spinner";

export const Loader = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="text-primary flex flex-col items-center justify-center gap-4">
        <Spinner className="size-6" />
        <span className="text-sm font-medium">در حال بارگذاری ...</span>
      </div>
    </div>
  );
};
