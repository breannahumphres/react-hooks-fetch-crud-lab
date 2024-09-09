import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, deleteQuestion, updateQuestion}) {
  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>;
  }
 
  return (
    <section>
      <h1>Quiz Questions</h1>
    <ul>{questions.map((question,index)=> (<QuestionItem key={question.id || index} question={question} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion}/>))}</ul>
    </section>
  );
}

export default QuestionList;
