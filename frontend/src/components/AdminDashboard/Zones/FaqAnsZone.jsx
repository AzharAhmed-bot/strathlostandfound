/* eslint-disable react/prop-types */

import AnswerQuestion from '../../Admin/AnswerQuestions';

export default function FaqAnsZone({ reviews }) {
    return (
        <div className=''>
            <h1 className="text-center underline text-blue-700 text-3xl font-semibold font-[Poppins]">FAQ Answer Section</h1>
            <AnswerQuestion reviews={reviews} />
        </div>
    );
}
