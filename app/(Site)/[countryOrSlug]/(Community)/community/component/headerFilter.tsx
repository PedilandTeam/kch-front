import {
  FadersHorizontal,
  SortAscending,
  XCircle,
} from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useGetTopic from "../apiForum/useGetTopic";

interface HeaderFilterProps {
  countryOrSlug: string;
}

export default function HeaderFilter({ countryOrSlug }: HeaderFilterProps) {
  const [sort, setSort] = useState("");
  const [colseSortDropdown, setColseSortDropdown] = useState(false);

  const [colseFilterDropdown, setColseFilterDropdown] = useState(false);
  const [filterValueId, setFilterValueId] = useState<string>("");
  const [filterDropdown, setFilterDropdown] = useState("");

  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortItemClick = (sortOption: string) => {
    setSort(sortOption);
    setColseSortDropdown(false);
  };

  const { data: topics } = useGetTopic();

  const handleFilterItemClick = (id: string, title: string) => {
    setFilterValueId(id);
    setFilterDropdown(title);
    setColseFilterDropdown(false);
  };

  const params = new URLSearchParams(searchParams.toString());
  const isFilter = params.get("filter");
  // set filter to url
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterValueId) {
      params.set("filter", filterValueId);
      router.push(`${pathName}?${params.toString()}`);
    }
  }, [filterValueId, pathName, router, searchParams]);

  // set si=ort to url
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (sort) {
      params.set("sort", sort);
      router.push(`${pathName}?${params.toString()}`);
    }
  }, [sort, pathName, router, searchParams]);

  return (
    <div className="flex items-center justify-center">
      {isFilter ? (
        <button
          onClick={() => {
            params.delete("filter"); // Remove the filter parameter
            setFilterValueId("");
            router.push(`${pathName}`);
          }}
          className=""
        >
          <XCircle size={28} color="#f22121" className="mb-1" />
        </button>
      ) : (
        ""
      )}

      {pathName === `/${countryOrSlug}/community` && (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              setColseFilterDropdown(!colseFilterDropdown);
              setColseSortDropdown(false);
            }}
            className="btn btn-ghost btn-sm dropdown-hover bg-transparent bg-contain border-none font-medium xl:text-base"
          >
            <FadersHorizontal size={21} color="#676567" />
            فیلتر
          </div>
          {colseFilterDropdown && (
            <ul
              onClick={() => setColseFilterDropdown(!colseFilterDropdown)}
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
            >
              {topics?.items.map((topic) => (
                <li key={topic.id}>
                  <a
                    onClick={() => handleFilterItemClick(topic.id, topic.title)}
                  >
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* sort */}

      {pathName === `/${countryOrSlug}/community` && (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            onClick={() => {
              setColseSortDropdown(!colseSortDropdown);
              setColseFilterDropdown(false);
            }}
            tabIndex={0}
            role="button"
            className="btn btn-ghost xl:text-base btn-sm dropdown-hover bg-transparent bg-contain border-none font-medium"
          >
            <SortAscending size={21} color="#676567" />
            ترتیب
          </div>
          {colseSortDropdown && (
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box w-48 p-2 shadow"
            >
              <li onClick={() => {}}>
                <a onClick={() => handleSortItemClick("asc")}>جدید ترین</a>
              </li>
              <li>
                <a onClick={() => handleSortItemClick("dec")}> قدیمی ترین</a>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
