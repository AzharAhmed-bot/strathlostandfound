
import { FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import content from '../../../../constants';

export default function ItemStatisticCard({ getTotalItems, mostLostCategory, getTotalClaims }) {
    return (
        <div className="flex items-center justify-center flex-wrap  ">
            {/* Total Lost Items Card */}
            <div className="bg-blue-900 text-orange-400 rounded-2xl overflow-hidden shadow-lg mx-4 my-4 flex-shrink-0 md:max-w-sm md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaExclamationCircle size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">{content.itemStatistic.allLostItem}</div>
                            <p className="text-base">{getTotalItems()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Most Lost Item Category Card */}
            <div className="max-w-sm bg-blue-900 text-red-500 rounded-2xl overflow-hidden shadow-lg mx-4 my-4">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            {/* Replace the icon with the appropriate one */}
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">{content.itemStatistic.mostLostCategory}</div>
                            <p className="text-base">{mostLostCategory}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Total Claims Card */}
            <div className="max-w-sm bg-blue-900 text-green-500 rounded-2xl overflow-hidden shadow-lg mx-4 my-4">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaFileAlt size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">{content.itemStatistic.totalClaims}</div>
                            <p className="text-base">{getTotalClaims()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
