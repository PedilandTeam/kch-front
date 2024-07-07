import AnswerCard from "./answerCard";
import QuestionCard from "./questionCard";

function QuestionAnswer() {
  return (
    <div className="h-auto min-h-[53vh] flex flex-col items-center">
      <div className="mt-[9rem]">
        <QuestionCard />
      </div>
      <div className=" flex flex-col items-end">
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
      </div>
    </div>
  );
}

export default QuestionAnswer;
