import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "../item/itemProfilePicture";
import { FolderSimpleStar } from 'app/client-packages/phosphor-icons/react'

type cardListItem = {
  page: PageNamespace.Page;
};

export default function SuggestedListItem({ page }: cardListItem) {
  return (
    <div className="card shadow-lg border border-gray-100 hover:border-gray-300">
      <figure className="pt-5">
        <Link href={`/${page.slug}`}>
          <ItemProfilePicture
            height={140}
            width={140}
            pageData={page}
            className={"rounded-full"}
          />
        </Link>
      </figure>
      <div className="card-body px-4 py-5">
        <Link href={`/${page.slug}`}>
          <h2 className="card-title font-PinarLT text-slate-700 hover:text-pink-800 text-lg block text-center truncate hover:overflow-visible">
            {page.title}
          </h2>
        </Link>

        <div className="flex mt-1 mb-2 justify-center card-rating">
          {/* @ts-ignore */}
          <div className="rating">
            <input
              type="radio"
              name="rating-1"
              className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
            />
          </div>
          {/* <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                      (0 نظر)
                    </span> */}
        </div>

        <div className="flex justify-center w-full card-tools text-[15px] mb-1 text-gray-600">
          <div className="flex ml-2">
            <CircleFlag
              alt={`پرچم کشور ${page.country.name}`}
              width={5}
              height={5}
              countryCode={page?.country?.code}
              className="w-5 ml-1"
              title={page?.country?.name}
            />
            <p className="truncate">{page?.city?.name}</p>
          </div>
          <div className="flex justify-center content-center">
            <FolderSimpleStar
              size={20}
              weight="light"
              className="ml-1 text-primary"
            />
            <span className="truncate">{page?.category?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
