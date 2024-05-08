const handleSaveAnswer = (index, newAnswer, item_id,questions,setQuestions,toast) => {
    const updatedQuestions = [...questions];
    const updatedItem = { ...updatedQuestions[index] }; 
    updatedItem.answer = newAnswer;
    updatedQuestions[index] = updatedItem; 
    setQuestions(updatedQuestions);
  
    fetch(`http://localhost:5000/reviews/${item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ answer: newAnswer })
    })
    .then((resp) => resp.json())
    .then(() => {
      toast.success("Answer posted successfully!");
    })
    .catch((error) => console.log(error));
  };

export default handleSaveAnswer;