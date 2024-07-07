import AnswerCard from "./answerCard";
import QuestionCard from "./questionCard";

function QuestionAnswer() {
  return (
    <div className="flex flex-col items-center mt-[5rem]">
      <QuestionCard />
      <div className="flex flex-col items-end">
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
      </div>
    </div>
  );
}

export default QuestionAnswer;
