/* eslint-disable react/prop-types */
import { FaExclamationCircle } from "react-icons/fa";
import Chart from "react-apexcharts";

export default function StatisticGraph({ state, cat, mostLostCategory }) {
    return (
        <div className="md:flex md:items-center ">
            {/* Bar Graph for Items */}
            <div className="max-w-2xl mx-auto my-4">
                <h1 className="mt-5 text-center text-3xl font-bold text-blue-700 underline">Items Lost Statistics</h1>
                <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    width="500"
                />
            </div>

            {/* Line Graph for Claims */}
            <div className="max-w-2xl mx-auto my-4">
                <h1 className="mt-5 text-center text-3xl font-bold text-blue-700 underline">Claim Statistics</h1>
                <div className="flex items-center justify-center text-red-600 ">
                    <FaExclamationCircle />
                    <p>Most Lost Category: {mostLostCategory}</p>
                </div>

                <Chart
                    options={cat.options}
                    series={cat.series}
                    type="line"
                    width="500"
                />
            </div>
        </div>
    );
}
