export default function Result({ score, total, restart, onLogout }) {
  return (
    <div className="result-wrapper">
      <div className="result-container">
        <h2 className="result-title">Quiz Completed! 🎉</h2>
        <div className="result-score">
          <p className="score-label">Your Score</p>
          <p className="score-value">{score} / {total}</p>
          <p className="score-percentage">
            {Math.round((score / total) * 100)}%
          </p>
        </div>

        <button className="restart-btn" onClick={restart}>
          Restart Quiz
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
