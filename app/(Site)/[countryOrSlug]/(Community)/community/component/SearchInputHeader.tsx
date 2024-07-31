import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface SearchInputHeaderProps {
  countryOrSlug: string;
}

export default function SearchInputHeader({
  countryOrSlug,
}: SearchInputHeaderProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialText = "نتیجه‌ای برای جستجوی شما یافت نشد.";
  const handleSearch = useCallback(() => {
    const url = `https://api.koochaa.com/forum/questions?limit=30&page=1&search=${searchQuery}&countryCode=${countryOrSlug}`;
    if (searchQuery.length > 2) {
      fetch(url, { credentials: "include" })
        .then((response) => response.json())
        .then((result) => {
          setResults(result.items || []);
        })
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  }, [searchQuery, countryOrSlug]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleSearch, 300); // تاخیر 300 میلی‌ثانیه‌ای برای درخواست جستجو
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, handleSearch]);
  useEffect(() => {
    if (!searchQuery) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }, [searchQuery]);
  return (
    <div className="relative w-full">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={() => setShowDropdown(false)}
        type="text"
        placeholder="دنبال چی می گردی؟"
        className="input w-full bg-gray-50 rounded-[1rem]"
      />
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-white mt-2 rounded-[1rem] shadow z-50"
        >
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
          >
            {results.length > 0 ? (
              results.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/${countryOrSlug}/community/${item.id}/`}
                >
                  <li className="p-2">
                    <a>{item.title}</a>
                  </li>
                </Link>
              ))
            ) : (
              <li className="p-2 text-gray-500">{initialText}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
