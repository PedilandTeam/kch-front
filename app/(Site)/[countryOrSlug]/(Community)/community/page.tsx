"use client";
import React from "react";
import {
  User,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import QuestionBox from "./questionBox";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";

export default function Page() {
  return (
    <div className="h-auto min-h-[44.6vh] ">
      <div className="w-full  p-4 h-auto flex flex-col  justify-center bg-white">
        <div className="flex flex-row items-center gap-3 w-full max-w-[72rem] rounded-lg bg-white  ">
          <div className="flex">
            <User
              avatarProps={{
                size: "sm",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
            />
          </div>
          <div className="flex-grow w-full">
            <Input size="sm" fullWidth placeholder="دنبال چی می گردی؟" />
          </div>

          <div className="flex justify-normal w-auto ">
            <div>
              <Bell size={25} color="#676567" />
            </div>
          </div>
        </div>
        <div className="flex mt-3 justify-between">
          <div className="flex items-center">
            <Button className="h-[32px]" variant="solid" color="warning">
            <span className="font-bold" > + ایجاد سوال</span>
            </Button>
          </div>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" size="sm">
                  <span>
                    <SortAscending size={21} color="#676567" />
                  </span>
               <span className="font-bold"> مرتب سازی</span>  
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Example with disabled actions"
                // disabledKeys={["edit", "delete"]}
              >
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete">Delete file</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" size="sm">
                  <span>
                    <FadersHorizontal size={21} color="#676567" />
                  </span>
                  <span className="font-bold">فیلتر</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Example with disabled actions"
                // disabledKeys={["edit", "delete"]}
              >
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete">Delete file</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[72rem]">
        <QuestionBox />
      </div>
    </div>
  );
}
