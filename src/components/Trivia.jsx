import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/src_sounds_play.mp3";
import wrong from "../sounds/src_sounds_wrong.mp3";
import correct from "../sounds/src_sounds_correct.mp3";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [playGame, setPlayGame] = useSound(play);
  const [correctAnswer, setCorrectAnswer] = useSound(correct);
  const [wrongAnswer, setWrongAnswer] = useSound(wrong);

  useEffect(() => {
    playGame();
  }, [playGame]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, cb) => {
    setTimeout(() => {
      cb();
    }, duration);
  };

  const handleClick = (answer) => {
    console.log(answer);
    setSelectedAnswer(answer);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(answer.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  return (
    <div className="trivia">
      <div className="question"> {question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer) => (
          <div
            className={selectedAnswer === answer ? className : "answer"}
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
