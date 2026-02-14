import { useState } from "react";
import { quizData } from "../data/data.js";
import Question from "../components/Question";
import Result from "../components/Result";

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
        <div className="quiz-container">
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
