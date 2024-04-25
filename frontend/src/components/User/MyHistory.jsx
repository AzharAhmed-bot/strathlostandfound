/* eslint-disable react/prop-types */
import NavProfile from "./NavProfile";
import { MdCheck, MdCancel, MdHourglassEmpty, MdLocationOn, MdDescription } from "react-icons/md"; 
import { FaInfo } from "react-icons/fa";


export default function MyHistory({ claims, categories, items }) {
  const defaultUserImage =
    "https://cdn.pixabay.com/photo/2015/11/03/09/09/magnifying-glass-1020142_1280.jpg";

  const user_id = sessionStorage.getItem("user_id");
  const user_idInt = parseInt(user_id);

  const MyClaimList = claims && claims.filter((claim) => claim.user_id === user_idInt);

  const getCategoryName = (categoryId) => {
    const category = categories && categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const getItemName = (itemId) => {
    const item = items && items.find((it) => it.id === itemId);
    return item ? item.name : "Unknown item";
  };

  const MyClaimDisplay =
    MyClaimList &&
    MyClaimList.map((claim) => (
      <div
        key={`${claim.id}-${claim.item_id}`}
        className="w-auto px-5 py-3 bg-white rounded-2xl flex flex-col justify-start items-start gap-3 overflow-hidden shadow-lg transition duration-300 transform hover:scale-105"
      >
        <img
          src={claim.image_proof || defaultUserImage}
          alt="Image proof"
          className="w-full h-auto rounded-2xl"
        />
        <div className="text-blue-900 text-lg font-bold font-inter">Item Name: {getItemName(claim.item_id)}</div>
        <div className="flex items-center gap-3">
          <MdDescription /> 
          <div className="text-black text-lg font-medium font-inter">Category: {getCategoryName(claim.category_id)}</div>
        </div>
        <div className="flex items-center gap-3">
          <MdLocationOn /> 
          <div className="text-black text-lg font-medium font-inter">Location: {claim.location}</div>
        </div>
        <div className="flex items-center gap-3">
          <FaInfo /> 
          <div className="text-black text-lg font-medium font-inter">Description Proof: {claim.description_proof}</div>
        </div>
        <div className={`text-${claim.Status === "Active" ? "green" : claim.Status === "Inactive" ? "red" : "yellow"}-500 flex items-center`}>
          {claim.Status === "Active" ? (
            <MdCheck className="mr-2 text-green-400" />
          ) : claim.Status === "Inactive" ? (
            <MdCancel className="mr-2 " />
          ) : (
            <MdHourglassEmpty className="mr-2" />
          )}
          {claim.Status === "Active" ? "Approved" : claim.Status === "Inactive" ? "Rejected" : "Pending"}
        </div>
      </div>
    ));

  return (
    <div className="bg-white min-h-screen">
      <NavProfile />
      <div className=" mx-auto mt-8 p-4">
        <h1 className="text-3xl font-semibold text-center text-blue-800 my-4">My Claim History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {MyClaimDisplay.length > 0 ? MyClaimDisplay : <NoHistory />}
        </div>
      </div>
    </div>
  );
}

const NoHistory = () => (
  <div className="text-center mt-8">
    <h1 className="text-3xl font-semibold mb-4">No History Yet</h1>
    <div className="flex items-center space-x-4 justify-center">
      <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12"></div>
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-40"></div>
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-32"></div>
      </div>
    </div>
  </div>
);
