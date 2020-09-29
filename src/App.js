import React from "react";

// import Button from "./components/button";

import { useState } from "react";
import { useEffect } from "react";

import { Questionaire } from './components';


const API_URL_COMPUTERS = "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple";



function App() {

  const [questions,  setQuestions]  = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setshowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL_COMPUTERS)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => 
        ({
            ...question,
            answers: [
              question.correct_answer,
              ...question.incorrect_answers,
            ].sort(() => Math.random() - 0.5),
        }));

        setQuestions(questions); 

      });
  }, []);

  const handleAnswer = ( answer ) => {
    if (!showAnswers) {
      //prevent double submission
      // check for the answer
      // show another question
      // change score if correct
      if (answer === questions[currentIndex].correct_answer) {
          setScore(score + 1);
      }
   }

   setshowAnswers(true);

  };

  const handleNextQuestion = () => {
    setCurrentIndex( currentIndex + 1)

    setshowAnswers(false);

  }
  return  questions.length > 0 ? (
    <div className="container " > 
    {currentIndex >= questions.length ? (
      <h1 className="text-3xl text-white font-bold">
        Game ended! Your score was {score} / {questions.length}
      </h1>
  ) : (
       <Questionaire 
        data={questions[currentIndex]} 
        showAnswers={showAnswers}
        handleNextQuestion={handleNextQuestion}
        handleAnswer={handleAnswer} 
        />
  )}
    </div>
  ) : (
      <h1 className="text-2xl ">Hey we are loading...</h1>
  );
}

export default App;