import React from "react";

function QuestionItem({question, deleteQuestion, updateQuestion}) {
  console.log(question);
  
  const { id, prompt, answers, correctIndex } = question;
  
if(!answers || !Array.isArray(answers)) {
  return <li>Error: Question {id} does not have valid answers.</li>;
}
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleSelectChange(event) {
    const newCorrectIndex = parseInt(event.target.value, 10);
    updateQuestion(id, newCorrectIndex);
  }
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick = {() => deleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
