/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaInfo, FaThumbtack, FaSearch, FaAlignLeft } from "react-icons/fa";
import NavBar from "../Navigation/NavBar";
import NavProfile from "../../User/NavProfile";
import AdminNavProfile from "../../Admin/AdminNavProfile";
import toast, { Toaster } from "react-hot-toast";
import handleClaim from "../../../services/Claims/handleClaim";
import { fetchLostAndFound } from "../../../../redux/lostandfoundSlicer";
import { useAppContext } from "../../../AppContext";
import { getCategoryName, getUserName, getItemName } from "../../../services/getters";
import content from "../../../../constants";

export default function Home() {
  const{items,categories}=useAppContext();
  const dispatch = useDispatch();
  const [users, setUsers] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredSearchItems, setFilteredSearchItems] = useState(null);
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");
  const userToken=sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await dispatch(fetchLostAndFound("/userInfo"));
        setUsers(userData.payload);
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const optionList = categories && categories.map((category) => {
    return <option key={category.id} value={category.id}>{category.name}</option>;
  });

  function handleSearch() {
    const categoryInt = parseInt(searchCategory);
    const categoryFilter = items && items.filter((item) => {
      const itemName = item.name.toLowerCase();
      const categoryMatches = categoryInt === 0 || item.category_id === categoryInt;
      const searchMatches = itemName.includes(searchValue.toLowerCase());
      return categoryMatches && searchMatches;
    });
  
    setFilteredSearchItems(categoryFilter);
  }
  const filteredItems = items && items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {!userToken ? <NavBar/> : (userRole === "student" ? <NavProfile/> : <AdminNavProfile/>)}
      <Toaster toastOptions={{ duration: 7000 }} />
      <div className=" h-full px-4 md:px-10 pt-28 pb-6 w-full ">
        <div className="flex mb-6 flex-row w-full">
          <select
            id="category"
            name="category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="w-1/2 px-4 py-2 shadow-black shadow-md  border-b border-black rounded-l-xl mb-2  md:mb-0"
            required
          >
            <option value="0">All Categories</option>
            {optionList}
          </select>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-1/2 px-4 py-2 shadow-black shadow-md  border-b border-black rounded-r-xl  mb-2 md:mb-0"
          />
          <div onClick={handleSearch} className="px-3 h-10 py-3 rounded-3xl bg-black hover:bg-yellow-600 transition ease-in-out cursor-pointer text-white">
            <FaSearch />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {((filteredSearchItems && filteredSearchItems.length > 0) || (filteredSearchItems === null && searchCategory === 0)
            ? filteredSearchItems
            : filteredItems || []
          ).map((item, index) => (
            <div
              key={item.id}
              className={`w-auto px-5 py-3 bg-white rounded-2xl flex flex-col justify-start items-start gap-3 overflow-hidden shadow-lg transition duration-300 transform hover:scale-105 ${
                index > 0 ? 'delay-100' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.location}
                className="w-full h-auto rounded-2xl"
              />
              <div className="text-blue-900 text-lg font-bold font-inter">{content.home.postTitle}{getUserName(item.user_id,users)}</div>
              <div className="flex items-center gap-3">
                <FaInfo />
                <div className="text-black text-lg font-medium font-inter">{content.home.itemTitle}{item.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <FaAlignLeft />
                <div className="text-black text-lg font-medium font-inter">{content.home.descriptionTitle}{item.description}</div>
              </div>
              <div className="flex items-center gap-3">
                <FaThumbtack />
                <div className="text-black text-lg font-medium font-inter">{content.home.categoryTitle}{getCategoryName(item.category_id,categories)}</div>
              </div>
              {item.Status === "Inactive" ? (
                <div className="bg-red-500 text-white w-1/2 rounded-full px-2 py-2 text-center mt-2">
                  <p>Claimed</p>
                </div>
              ) : (
                <button onClick={() => handleClaim(items,item,navigate,getCategoryName,getItemName,categories,toast)} className="mt-4 w-1/2 bg-green-500  text-white py-2 px-4 rounded-full hover:bg-green-600">
                  Claim
                </button>
              )}
            </div>
          ))}
        </div>
        {((filteredSearchItems && filteredSearchItems.length === 0) ||
          (!filteredSearchItems && filteredItems.length === 0)) && (
            <div className="text-center mt-8">
              <h1 className="text-3xl font-semibold mb-4">{content.home.noItemsTitle}</h1>
              <div className="flex items-center space-x-4 justify-center">
                <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12"></div>
                <div className="space-y-2">
                  <div className="animate-pulse rounded-md bg-gray-500 h-4 w-40"></div>
                  <div className="animate-pulse rounded-md bg-gray-500 h-4 w-32"></div>
                </div>
              </div>
            </div>
        )}
      </div>
    </>
  );
}
