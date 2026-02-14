export default function Question({ data, handleAnswer }) {
  return (
    <div>
      <h2>{data.question}</h2>
      {data.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
