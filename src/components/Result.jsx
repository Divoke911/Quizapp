export default function Result({ score, total, restart }) {
  return (
    <div>
      <h2 className="result-text">
        Your Score: {score} / {total}
      </h2>

      <button className="restart-btn" onClick={restart}>
        Restart Quiz
      </button>
    </div>
  );
}
