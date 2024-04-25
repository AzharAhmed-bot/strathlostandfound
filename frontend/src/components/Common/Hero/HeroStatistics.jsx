import content from "../../../../constants";

export default function HeroStatistics() {
  return (
    <div className="bg-[#e8f5e2] w-full p-6 flex gap-10 flex-wrap justify-around ">
      
        {content.statistics.map((stat, index) => (
          <div key={index} className="lg:w-64 py-4 bg-orange-300 rounded-3xl justify-center items-center gap-2.5 inline-flex">
          <div  className="text-center text-black text-3xl font-medium font-['Inter'] lg:w-64">
            {stat.number}<br/>{stat.description}
          </div>
          </div>
        ))}
    </div>
  );
}
