
import content from "../../../../constants";
import CommunityHelp from "./CommunityHelp";


export default function HeroServices(){



return(
    <div className="bg-[#e8f5e2] flex justify-center items-center flex-col">
    <div className="w-full mt-8 h-px border border-black"></div>
    <div className="lg:w-80 w-auto mt-10 text-center text-black text-5xl font-bold font-['Inter']">{content.topper}</div>
    <div className="flex flex-row flex-wrap justify-center gap-12 mt-10">
    {content.servicesData.map((service, index) => (
          <div key={index} className="lg:w-80 lg:h-80 md:w-72 sm:w-auto flex bg-gradient-to-b from-stone-300 to-orange-300 rounded-2xl flex-col justify-center items-center gap-4">
             <img className="h-auto w-auto" src={service.icon} alt={service.title} />
            <div className="text-center text-black text-5xl font-bold font-['Inter']">{service.title}</div>
            <div className="text-center text-black text-3xl font-medium font-['Inter']">{service.description}</div>
          </div>
        ))}
        </div>
       <CommunityHelp/>
      </div>
    )
}