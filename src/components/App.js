import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [page, setPage] = useState("List");

 function fetchQuestions() {
    fetch("http://localhost:4000/questions")
    .then((response) =>response.json())
    .then((data) => {
      console.log(data);
      setFetchedQuestions(data);
    })
    .catch((error) => console.error(error));
  }
  useEffect(()=>{
    fetchQuestions();
  }, []);

  function addQuestion(newQuestionData){
      fetch("http://localhost:4000/questions", {
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(newQuestionData),
      })
      .then((response)=> response.json())
      .then((data) => {
        setFetchedQuestions((prevQuestions)=> [...prevQuestions,data]);
      })
      .catch((error) => console.error("Error posting question;", error));
  }

 function deleteQuestion(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE", 
  })
  .then((response) => {
    if (response.ok) {
      setFetchedQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id)
    );
    }
  })
  .catch((error) =>console.error(error));
 }
  

 function updateQuestion(id, newCorrectQuestion) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: newCorrectQuestion,
    }),
  })
  .then((response) => response.json())
  .then((updatedQuestion) => {
    setFetchedQuestions((prevQuestions) => prevQuestions.map((question) => question.id === updatedQuestion.id ? updatedQuestion : question))
  })
  .catch((error) => console.error(error));
 }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (<QuestionForm addQuestion={addQuestion}/>) : (<QuestionList updateQuestion = {updateQuestion} deleteQuestion = {deleteQuestion} questions= {fetchedQuestions}/>)}
    </main>
  );
}

export default App;
