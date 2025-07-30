'use client';

import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';

export interface SelectSearch {
    setSearch: Dispatch<SetStateAction<string>>;
}
function SelectSearch({ setSearch }: SelectSearch) {

    const [tempSearch, setTempSearch] = useState<string>('')

    const onSearchChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempSearch(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
          setSearch(tempSearch);
        }, 1000);
        return () => clearTimeout(timeout);
      }, [tempSearch, setSearch]);
    

    return (
        <div className='sticky top-0 z-10 w-full bg-white p-2'>
            <input
                onChange={onSearchChanges}
                placeholder='جستجو'
                onClick={(e) => e.stopPropagation()}
                type='text'
                className='input input-bordered w-full bg-white'
            />
        </div>
    );
}


export default memo(SelectSearch)