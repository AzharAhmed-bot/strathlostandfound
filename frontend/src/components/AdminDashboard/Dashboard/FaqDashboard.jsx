/* eslint-disable react/prop-types */
import AdminNavProfile from "../../Admin/AdminNavProfile";
import { getUnansweredQuestions,getAnsweredQuestions,getTotalQuestions } from "../../../services/getters";
import FaqStatisticCard from "../StatitisticCards/FaqStatisticCard";
import FaqAnsZone from "../Zones/FaqAnsZone";
import { useAppContext } from "../../../AppContext";

const FaqDashboard=()=>{
  const {reviews}=useAppContext();



    return(
        <>
        <AdminNavProfile/>
        <div className="flex flex-row h-full bg-white mt-20">
        <div className="flex-grow flex flex-col">
        <FaqStatisticCard
           totalQuestions={getTotalQuestions(reviews)}
           unansweredQuestions={getUnansweredQuestions(reviews)}
           answeredQuestions={getAnsweredQuestions(reviews)}
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