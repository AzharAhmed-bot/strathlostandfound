/* eslint-disable react/prop-types */
import { useState } from 'react';
import FaqItem from './FaqItem';
import content from '../../../../constants';
import { toast } from 'react-hot-toast';
import handlPostFaq from "../../../services/faqhandlers/handlePostFaq";


export default function Faq({reviews}) {

  const [question, setNewQuestion] = useState('');
  
  
  const filteredReviews =
  reviews && reviews.filter((item) => item.answer !== null);

  const handlePostFaqWrapper=async(e)=>{
    e.preventDefault()
    handlPostFaq(question,toast,setNewQuestion);
  }
  
  return (
    <div className="container my-24 mx-auto md:px-6">
    <section className="mb-32">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="mb-6 md:mb-0">
          {/* Map existing FAQs */}
          {filteredReviews && filteredReviews.map((faq, index) => (
            <FaqItem key={index} question={faq.review} answer={faq.answer} />
          ))}
        </div>

        <div className="mb-6 md:mb-0">
          <h2 className="mb-6 text-3xl font-bold">{content.faqData.topper}</h2>

          <p className="text-neutral-500 dark:text-neutral-300">
            {content.faqData.title}{' '}
            <a href="#!" className="text-primary transition duration-300 hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
              {content.faqData.subtitle}
            </a>
            .
          </p>
          {/* Form to submit new questions */}
          <div className='mt-10'>
            <form onSubmit={handlePostFaqWrapper}>
              <label htmlFor="newQuestion" className="mb-4 font-bold">
                {content.faqData.semititle}:
              </label>
              <textarea
                id="newQuestion"
                className="mb-6 p-2 border rounded-md w-full"
                rows="4"
                value={question}
                onChange={(e) => setNewQuestion(e.target.value)}
              ></textarea>
              <button id='postFaq'>{content.faqData.buttonLabel}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
