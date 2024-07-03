"use client";
import React, { useState } from "react";
import {
  User,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";
import QuestionModal from "./questionModal";

export default function CommunityHeader() {
  const [openModal, setOpenModal] = useState(false);
  function manageModal() {
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal && (
        <QuestionModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <div className=" header fixed top-0 w-full  bg-white z-50 shadow-md">
        <div className="p-4 flex flex-col gap-3 max-w-screen-xl mx-auto ">
          <div className="flex items-center gap-3">
            <Input size="md" fullWidth placeholder="دنبال چی می گردی؟" />
            <Button variant="light"  isIconOnly>
              <Bell size={33} color="#676567" />
            </Button>
          </div>
          <div className="flex justify-between mt-3">
            <Button onClick={manageModal} variant="solid" color="warning">
              <h2 className="font-bold"> + ایجاد سوال</h2>
            </Button>
            <div className="flex items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" className="p-1">
                    <FadersHorizontal size={21} color="#676567" />
                    <span className="">فیلتر</span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Example with disabled actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem key="delete">Delete file</DropdownItem>
                </DropdownMenu>
              </Dropdown>{" "}
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" className="p-1">
                    <SortAscending size={21} color="#676567" />
                    <span className=""> مرتب سازی</span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Example with disabled actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem key="delete">Delete file</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
