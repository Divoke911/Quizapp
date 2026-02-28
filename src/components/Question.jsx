import techpathshala_logo from '../assets/techoaathshala_logo.png';
import user_icon from '../assets/profile_picture.png';

export default function Question({
  data,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  handleAnswer,
  handleNext,
  handlePrevious,
  handleSubmit,
  isFirstQuestion,
  isLastQuestion,
  onLogout
}) {
  return (
    <div className="quiz-card">
      {/* Header with user info */}
      <div className="quiz-header">
        <div className="user-info">
          <span className="user-icon"><img
            src={techpathshala_logo}
            alt="techpathshala_logo"
            style={{ width: '170px', height: 'auto' }}
          /></span>
        </div>
        <div className="quiz-actions">
          <span className="user-icon"><img
            src={user_icon}
            alt="user_icon"
            style={{ width: '50px', height: 'auto' }}
          /></span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="quiz-progress">
        <h2 className="question-number">Question {questionNumber} of {totalQuestions}</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="question-section">
        <h3 className="question-title">{questionNumber}. {data.question}</h3>
        <p className="question-subtitle">Supporting Text</p>
      </div>

      {/* Options */}
      <div className="options-section">
        {data.options.map((option, index) => (
          <label
            key={index}
            className={`option-label ${selectedAnswer === option ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="quiz-option"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleAnswer(option)}
              className="option-radio"
            />
            <span className="option-number">{index + 1}.</span>
            <span className="option-text">{option}</span>
          </label>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="quiz-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
        >
          ← Previous
        </button>

        {isLastQuestion ? (
          <button
            className="nav-btn submit-btn"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Submit & Continue →
          </button>
        ) : (
          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            Submit & Continue →
          </button>
        )}
      </div>
    </div>
  );
}
