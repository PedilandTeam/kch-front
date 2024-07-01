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
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";

export default function CommunityHeader() {
  return (
    <div className="fixed top-0 w-full max-w-[72rem] bg-white z-50 shadow-md">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <User
            avatarProps={{
              size: "sm",
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
          />
          <Input size="sm" fullWidth placeholder="دنبال چی می گردی؟" />
          <Bell size={33} weight="bold" color="#676567" />
        </div>
        <div className="flex justify-between mt-3">
          <Button className="h-[32px]" variant="solid" color="warning">
            <span className="font-bold"> + ایجاد سوال</span>
          </Button>
          <div className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" size="sm">
                  <FadersHorizontal size={21} color="#676567" />
                  <span className="font-bold">فیلتر</span>
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
                <Button variant="light" size="sm">
                  <SortAscending size={21} color="#676567" />
                  <span className="font-bold"> مرتب سازی</span>
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
  );
}
