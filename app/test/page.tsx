"use client"

import React, { useEffect, useState } from "react"


export default function () {

    const [data, setData] = useState<number[]>([])
    const checked = (n: number) => data.some(s => s == n)
    const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((old) => [...old, +e.target.value])
    }
    useEffect(() => {

    }, [])

    return (
        <>
            <div className=" h-[300px] flex justify-center items-center w-ful ">
                <input value={1} checked={checked(1)} onChange={changed} id="i" type="checkbox" className="checkbox checkbox-secondary checkbox-sm ml-3" />
                <label htmlFor="i">this is test input</label>
            </div>
            <div className=" h-[300px] flex justify-center items-center w-ful ">
                <input value={2} checked={checked(2)} onChange={changed} id="i" type="checkbox" className="checkbox checkbox-secondary checkbox-sm ml-3" />
                <label htmlFor="i">this is test input 1</label>
            </div>
            <div className=" h-[300px] flex justify-center items-center w-ful ">
                <input value={3} checked={checked(3)} onChange={changed} id="i" type="checkbox" className="checkbox checkbox-secondary checkbox-sm ml-3" />
                <label htmlFor="i">this is test input 2</label>
            </div>
            <div className=" h-[300px] flex justify-center items-center w-ful ">
                <input value={4} checked={checked(4)} onChange={changed} id="i" type="checkbox" className="checkbox checkbox-secondary checkbox-sm ml-3" />
                <label htmlFor="i">this is test input 3</label>
            </div>
            <div className=" h-[300px] flex justify-center items-center w-ful ">
                <input value={4} checked={checked(5)} onChange={changed} id="i" type="checkbox" className="checkbox checkbox-secondary checkbox-sm ml-3" />
                <label htmlFor="i">this is test input 4</label>
            </div>

        </>
    )

}