"use client"
import { Flag, HouseLine, List } from '@phosphor-icons/react'
import React from 'react'

export default function BottomMenu() {
  return (
    <div className="md:hidden fixed z-50 bottom-0 h-[5rem] w-full gap-[3rem] bg-white flex justify-center items-center py-2 border-t-2 border-gray-300">
      <List size={25} color="#282828" />
      <HouseLine size={25} color="#282828" />
      <Flag size={25} color="#282828" />
    </div>
  )
}
