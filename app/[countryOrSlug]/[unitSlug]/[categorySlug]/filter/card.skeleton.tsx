import ContentLoader from "react-content-loader";

export default function CardSkeleton() {
  return (
    <div className="skeleton min-h-[500px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-4">
        {Array.from({ length: 12 }).map((skeleton: any, index) => {
          return (
            <ContentLoader
              key={`content-loader-${index}`}
              speed={2}
              width={417}
              height={126}
              viewBox="0 0 417 126"
              backgroundColor="#ededed"
              foregroundColor="#e0e0e0"
              id={`content-loader-${index}-id`}
              uniqueKey="unit-pages"
            >
              <rect x="55" y="12" rx="0" ry="0" width="220" height="16" />
              <rect x="55" y="53" rx="0" ry="0" width="220" height="14" />
              <rect x="55" y="92" rx="0" ry="0" width="220" height="16" />
              <circle cx="355" cy="62" r="50" />
            </ContentLoader>
          );
        })}
      </div>
    </div>
  );
}
