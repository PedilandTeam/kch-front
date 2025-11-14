// src/components/Community/QuestionsTools.tsx

import { Input, Button } from "@/components/ui";

export const QuestionsTools = () => {
  return (
    <div className="_question-tools">
      <div className="flex items-center gap-2">
        <Input placeholder="جستجو..." />
        <div>
          <Button>سوال بپرس</Button>
        </div>
      </div>
    </div>
  );
};
