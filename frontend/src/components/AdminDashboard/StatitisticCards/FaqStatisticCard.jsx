
// Import necessary dependencies
import { FaQuestionCircle, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import content from '../../../../constants';

export default function FaqStatisticCard({ totalQuestions, unansweredQuestions, answeredQuestions }) {
    return (
        <div className="flex items-center justify-center flex-wrap ">
            {/* Total Questions Card */}
            <div className="max-w-xs md:max-w-sm bg-blue-900 text-orange-400 rounded-3xl overflow-hidden shadow-lg mx-4 my-4">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaQuestionCircle size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">{content.faqStatistic.totalQuestion}</div>
                            <p className="text-base">{totalQuestions}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unanswered Questions Card */}
            <div className="max-w-xs md:max-w-sm bg-blue-900 text-red-500 rounded-3xl overflow-hidden shadow-lg mx-4 my-4">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaRegTimesCircle size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-red-500 text-xl mb-2">{content.faqStatistic.unansweredQuestion}</div>
                            <p className="text-base">{unansweredQuestions}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Answered Questions Card */}
            <div className="max-w-xs md:max-w-sm bg-blue-900 text-green-400 rounded-3xl overflow-hidden shadow-lg mx-4 my-4">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaRegCheckCircle size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-green-400 text-xl mb-2">{content.faqStatistic.answeredQuestion}</div>
                            <p className="text-base">{answeredQuestions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
