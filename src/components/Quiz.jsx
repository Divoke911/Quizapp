import { useState } from "react";
import { quizData } from "../data";
import Question from "./Question";
import Result from "./Result";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div>
      {showResult ? (
        <Result score={score} total={quizData.length} restart={restartQuiz} />
      ) : (
        <Question
          data={quizData[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
