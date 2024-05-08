import eclipse1 from "@assets/Ellipse1.webp";
import eclipse2 from "@assets/Ellipse2.webp";
import eclipse3 from "@assets/Ellipse3.webp";
import eclipse4 from "@assets/Ellipse4.webp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import content from "../../../../constants";
export default function CommunityHelp(){
    const eclipseImages = [eclipse1, eclipse2, eclipse3, eclipse4];
    const navigate=useNavigate()

        function handlePost(){
            navigate("/login")
        }



return(
    <div className="bg-gradient-to-l mt-10 from-[#e8f5e2] via-zinc-300 to-[#e8f5e2] w-full flex flex-row flex-wrap justify-center gap-28 " >
    <div>
    <div className="lg:pl-20 pl-10 mt-10 text-black text-4xl  lg:text-5xl font-bold font-['Inter']">{content.communityHelpData.title}<br />{content.communityHelpData.semititle}</div>
    <div className="lg:pl-20 pl-10 mt-10 h-12 justify-center items-center inline-flex">
    {eclipseImages.map((eclipse, index) => (
    <img key={index} className="w-12 h-12 rounded-full border-3 border-white" src={eclipse} alt={`eclipse${index + 1}`} />
    ))}
    </div>
    </div>
    <div>
    <div className="flex flex-col items-center justify-center lg:w-96 w-auto lg:h-96 h-auto bg-gradient-to-b from-zinc-100 to-[#e8f5e2] rounded-3xl">
        <img src={content.communityHelpData.icon} alt="Community search" />
    <div className="text-center text-black text-3xl font-medium font-inter">{content.communityHelpData.subtitle}</div>
            <button
             onClick={handlePost}
             className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            {content.communityHelpData.buttonLabel}
            </button>

    </div>
    </div>
    </div>
)
}