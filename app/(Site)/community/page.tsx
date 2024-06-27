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
import { Question } from "@phosphor-icons/react";
import QuestionBox from "./questionBox";

export default function Page() {
  return (
    <div className="h-auto min-h-[42.5vh]">
      <div className="w-full p-4 h-auto flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-[72rem] rounded-lg bg-white  ">
          <div className="flex-grow w-full">
            <Input fullWidth placeholder="دنبال چی می گردی؟" />
          </div>
          {/* <div>
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
            />
          </div> */}
          <div className="flex w-full justify-between md:justify-normal md:w-auto ">
            <div className="flex items-center">
              <Button variant="light">+ سوال</Button>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">فیلتر</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Example with disabled actions"
                disabledKeys={["edit", "delete"]}
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
