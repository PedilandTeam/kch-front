import ContentLoader from "react-content-loader";

export default function CardSkeleton() {
  return (


    <div className="flex flex-col justify-center items-center">
      <div className="list-card min-h-[500px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-6">
          {Array.from({ length: 12 }).map((skeleton: any, index) => {
            return (
              <div key={`cardlist-page-index-${index}`} className="card shadow-lg border border-gray-100 hover:border-gray-300">
                <figure className="pt-5">
                  <ContentLoader
                    width={140}
                    height={140}
                  >
                    <rect x="0" y="0" rx="100" ry="100" width="140" height="140" />
                  </ContentLoader>
                </figure>
                <div className="card-body px-4 py-5">


                  <ContentLoader
                      height={30}
                      className="w-full flex justify-center items-center"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
                  </ContentLoader>

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
                  <ContentLoader
                    height={20}
                    className="w-full flex justify-center items-center"
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />              
                  </ContentLoader>

                  <div className="flex justify-center w-full card-tools text-[15px] mb-1 text-gray-600">
                    <div className="flex ml-2">
                      {/* <CircleFlag
                        alt={`پرچم کشور ${country.name}`}
                        width={5}
                        height={5}
                        countryCode={page?.country?.code}
                        className="w-5 ml-1"
                        title={page?.country?.name}
                      /> */}
                      {/* <p className="truncate">{page?.city?.name}</p> */}
                    </div>
                    <div className="flex justify-center content-center">
                      {/* <FolderIcon className="w-5 ml-1 text-gray-400" /> */}
                      {/* {variant == "category" ? (
                        <span className="truncate">{page?.category?.name}</span>
                      ) : (
                        <Link
                          href={categoryPathGenerator(
                            country.code,
                            page.unit?.slug,
                            page.category.slug
                          )}
                        >
                          <span className="truncate">{page?.category?.name}</span>
                        </Link>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
