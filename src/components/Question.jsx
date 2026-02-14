export default function Question({ data, handleAnswer }) {
  return (
    <div>
      <h2 className="question">{data.question}</h2>

      {data.options.map((option, index) => (
        <button
          key={index}
          className="option-btn"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
