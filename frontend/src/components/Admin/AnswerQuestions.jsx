/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchLostAndFound from "../../../redux/lostandfoundSlicer";
import AdminFaqSection from "./AdminFaqSection";
import { toast, Toaster } from "react-hot-toast";

export default function AnswerQuestions({reviews}) {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);

  

  useEffect(() => {
    setQuestions(reviews);
  }, [reviews]);

  const handleSaveAnswer = (index, newAnswer, item_id) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = newAnswer;
    setQuestions(updatedQuestions);
    fetch(`http://localhost:5000/reviews/${item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({ answer: newAnswer })
    })
      .then((resp) => resp.json())
      .then((data) => {
        toast.success("Answer posted successfully!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="bg-white w-4/5 px-8 py-6 rounded-lg mx-auto">
      <Toaster toastOptions={{ duration: 4000 }} />
      {questions &&
        questions.map((item, index) => (
          <AdminFaqSection
            key={index}
            question={item.review}
            answer={item.answer}
            onSave={(newAnswer) => handleSaveAnswer(index, newAnswer, item.id)}
          />
        ))}
    </section>
  );
}
