/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AdminFaqSection from "./AdminFaqSection";
import { useAppContext } from "../../AppContext";
import { toast, Toaster } from "react-hot-toast";
import handleSaveAnswer from "../../services/faqhandlers/handleSaveAnswer";

export default function AnswerQuestions() {
  const {reviews}=useAppContext();
  const [questions, setQuestions] = useState([]);

  

  useEffect(() => {
    setQuestions(reviews);
  }, [reviews]);


  

  return (
    <section className="bg-white w-4/5 px-8 py-6 rounded-lg mx-auto">
      <Toaster toastOptions={{ duration: 4000 }} />
      {questions &&
        questions.map((item, index) => (
          <AdminFaqSection
            key={index}
            question={item.review}
            answer={item.answer}
            onSave={(newAnswer) => handleSaveAnswer(index, newAnswer, item.id,questions,setQuestions,toast)}
          />
        ))}
    </section>
  );
}
