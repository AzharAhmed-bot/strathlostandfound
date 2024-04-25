/* eslint-disable react/prop-types */
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

export default function UserStatisticCard({ getTotalUsers, getActiveUsers, getInactiveUsers }) {
    return (
        <div className="flex items-center justify-center flex-wrap mt-24">
            {/* Total Users Card */}
            <div className="bg-blue-900 text-orange-400 rounded-2xl overflow-hidden shadow-lg mx-4 my-4 flex-shrink-0 md:max-w-sm md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaUsers size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">Total Users</div>
                            <p className="text-base">{getTotalUsers()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Users Card */}
            <div className="bg-blue-900 text-green-400 rounded-2xl overflow-hidden shadow-lg mx-4 my-4 flex-shrink-0 md:max-w-sm md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaUserCheck size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">Active Users</div>
                            <p className="text-base">{getActiveUsers()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inactive Users Card */}
            <div className="bg-blue-900 text-red-500 rounded-2xl overflow-hidden shadow-lg mx-4 my-4 flex-shrink-0 md:max-w-sm md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaUserTimes size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-2">Inactive Users</div>
                            <p className="text-base">{getInactiveUsers()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
