import { Button } from "@components/index";
import type { AdNamespace } from "@/types/ad";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function Ad({ data }: { data: AdNamespace.IAd }) {
  return (
    <div className="flex w-11/12 shrink-0 flex-col justify-between gap-y-6 rounded-lg border px-5 py-5 md:h-36 md:w-7/12 md:flex-row lg:min-h-full lg:w-10/12 lg:px-10 lg:py-10">
      <div className="flex items-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-lg">
          <Image
            src={
              data.pictures?.[0]
                ? `${process.env.NEXT_PUBLIC_DL_URL}/ads/${data.id}/${data.pictures?.[0]}`
                : "/images/list/logo/logo-placeholder.webp"
            }
            alt="عکس آگهی"
            fill
          />
        </div>
        <div className="flex h-full flex-col items-start justify-center pr-4">
          <p className="text-xl font-medium">{data.title}</p>
          <div className="mt-4 text-gray-700">
            <p>
              {data.price ? `${data?.price.toLocaleString()} دلار` : "توافقی"}
            </p>
            <p>
              {moment(data.createdDate).calendar()} در {data.city?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <p>
          وضعیت:{" "}
          {data.availability ? (
            <span className="text-green-700">منتشر شده</span>
          ) : (
            <span className="text-red-500">تعلیق</span>
          )}
        </p>
        <Link className="w-full" href={`/account/ads/${data.id}`}>
          <Button className="btn-outline btn-primary w-full">
            ویرایش آگهی
          </Button>
        </Link>
      </div>
    </div>
  );
}
