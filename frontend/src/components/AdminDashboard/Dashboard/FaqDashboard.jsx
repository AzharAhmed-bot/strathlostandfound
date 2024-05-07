/* eslint-disable react/prop-types */
import AdminNavProfile from "../../Admin/AdminNavProfile";
import FaqStatisticCard from "../StatitisticCards/FaqStatisticCard";
import FaqAnsZone from "../Zones/FaqAnsZone";
import { useAppContext } from "../../../AppContext";

const FaqDashboard=()=>{
  const {reviews}=useAppContext();

  //Function to calcultate unanswered questions
  const getUnansweredQuestions = () => reviews && reviews.filter((q)=>q.answer===null).length;
  // Function to calculate answered questions
  const getAnsweredQuestions=()=> reviews && reviews.filter((q)=>q.answer!==null).length;    
  // Function to get all questions
  const getTotalQuestions=()=>reviews.length;

    return(
        <>
        <AdminNavProfile/>
        <div className="flex flex-row h-full bg-white mt-20">
        <div className="flex-grow flex flex-col">
        <FaqStatisticCard
           totalQuestions={getTotalQuestions()}
           unansweredQuestions={getUnansweredQuestions()}
           answeredQuestions={getAnsweredQuestions()}
        />
        <div>
        <FaqAnsZone reviews={reviews} />
        </div>
        </div>
        </div>
        </>
    )
}


export default FaqDashboard;