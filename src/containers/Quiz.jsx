import { useState } from "react";
import { quizData } from "../data/data.js";
import Question from "../components/Question";
import Result from "../components/Result";

export default function Quiz({ onLogout }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (selectedOption) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = selectedOption;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        setShowResult(true);
    };

    const calculateScore = () => {
        return selectedAnswers.reduce((score, answer, index) => {
            return answer === quizData[index].answer ? score + 1 : score;
        }, 0);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(Array(quizData.length).fill(null));
        setShowResult(false);
    };

    return (
        <div className="quiz-wrapper">
            {showResult ? (
                <Result
                    score={calculateScore()}
                    total={quizData.length}
                    restart={restartQuiz}
                    onLogout={onLogout}
                />
            ) : (
                <Question
                    data={quizData[currentQuestion]}
                    questionNumber={currentQuestion + 1}
                    totalQuestions={quizData.length}
                    selectedAnswer={selectedAnswers[currentQuestion]}
                    handleAnswer={handleAnswer}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    handleSubmit={handleSubmit}
                    isFirstQuestion={currentQuestion === 0}
                    isLastQuestion={currentQuestion === quizData.length - 1}
                    onLogout={onLogout}
                />
            )}
        </div>
    );
}
