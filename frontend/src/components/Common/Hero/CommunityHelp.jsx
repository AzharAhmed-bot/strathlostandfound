import eclipse1 from "@assets/Ellipse1.webp";
import eclipse2 from "@assets/Ellipse2.webp";
import eclipse3 from "@assets/Ellipse3.webp";
import eclipse4 from "@assets/Ellipse4.webp";

import content from "../../../../constants";
export default function CommunityHelp(){
    const eclipseImages = [eclipse1, eclipse2, eclipse3, eclipse4];

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
        <button className="mt-6 lg:w-44 w-auto lg:h-12 h-auto mb-4 bg-orange-300 text-black rounded-full text-2xl font-medium font-inter">{content.communityHelpData.buttonLabel}</button>
    </div>
    </div>
    </div>
)
}