import BottomMenu from "../bottomMenu";
import CommunityHeader from "../communityHeader";
import AnswerCard from "./answerCard";
import QuestionCard from "./questionCard";

function QuestionAnswer() {
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center pb-[5rem]">
      <div className="fixed top-0 z-50 flex justify-center w-full">
        <CommunityHeader />
      </div>
      <QuestionCard />
      <div className="flex flex-col items-end">
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />

      </div>
      <BottomMenu />
    </div>
  );
}

export default QuestionAnswer;
