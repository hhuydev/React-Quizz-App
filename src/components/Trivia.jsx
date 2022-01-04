import React from "react";
import { useState, useEffect } from "react";
const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
  const [question, setQuestions] = useState(null);
  useEffect(() => {
    setQuestions(data[questionNumber - 1]);
  }, [data, questionNumber]);
  return (
    <div className="trivia">
      <div className="question"> {question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer) => (
          <div className="answer">{answer.text}</div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
