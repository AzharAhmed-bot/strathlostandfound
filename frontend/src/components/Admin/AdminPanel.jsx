
/* eslint-disable react/prop-types */

import AdminNavProfile from './AdminNavProfile';
import defaultImage from '../../assets/default.webp';
import { useState,useEffect } from 'react';
import {toast,Toaster} from "react-hot-toast"
import { FaChevronDown, FaChevronUp ,FaClock,FaTimesCircle} from 'react-icons/fa';
import { FaIdCard, FaTag, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle, FaCheckCircle, FaTrashAlt, FaAlignLeft } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { fetchLostAndFound } from '../../../redux/lostandfoundSlicer';
import { getCategoryName,getUserName,getUserEmail } from '../../services/getters';
import { useAppContext } from '../../AppContext';
import handleDeleteItem from '../../services/Itemshandlers/handleDeleteItem';
import handleDeleteClaim from '../../services/Claimshandlers/handleDeleteClaim';
import handleRejectClaim from '../../services/Claimshandlers/handleRejectClaim';
import handleAdminClaim from '../../services/Claimshandlers/handleAdminClaim';

const defaultUserImage = defaultImage; // Provide the path to your default image.

const AdminPanel = () => {
  const {items,claims,setClaims,categories,setItems}=useAppContext();
  const dispatch =useDispatch();
  const [users,setUsers]=useState("")
  const [claimsVisibility, setClaimsVisibility] = useState({});

  useEffect(()=>{
    const fetchUsers=async ()=>{
      try{
        const userData=await dispatch(fetchLostAndFound("/users"));
        setUsers(userData.payload);

      }
      catch(error){
        console.error("Failed to fetch", error);
      }
    }
    fetchUsers()
  },[dispatch])


  
    const itemAndClaims = items && items.map((item) => {
    const itemClaims = claims && claims.filter((claim) => claim.item_id === item.id);

    
    const handleVisibility = (item) => {
      setClaimsVisibility((prev) => ({...prev, [item.id]:!prev[item.id] }));
      
    };
    
  
    return (
      <div key={item.id} className="bg-white rounded-lg shadow-lg  mb-8 p-4">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className='flex flex-wrap'>
        <div className="w-1/3 pr-4">
          <img src={item.image || defaultUserImage} alt={item.name} className="w-full h-full object-cover rounded-lg mb-2" />
        </div>
        <div className="w-2/3 flex flex-wrap items-center h-3/4 gap-12">
          <div className='flex items-center gap-2'><FaIdCard/><h2 className="text-black text-lg font-medium font-inter">Lost Item ID: {item.id}</h2></div>
          <div className='flex items-center gap-2'><FaTag /><h2 className="text-black text-lg font-medium font-inter"> Lost Item: {item.name}</h2></div>
          <div className='flex items-center gap-2'><FaUser /><p className="text-black text-lg font-medium font-inter"> Posted By: {getUserName(item.user_id,users)}</p></div>
          <div className='flex items-center gap-2'><FaInfoCircle /> <p className="text-black text-lg font-medium font-inter">Category: {getCategoryName(item.category_id,categories)}</p></div>
          <div className='flex items-center gap-2'><FaMapMarkerAlt /><p className="text-black text-lg font-medium font-inter"> Location: {item.location}</p></div>
          <div className='flex items-center gap-2'><FaCalendarAlt /><p className="text-black text-lg font-medium font-inter"> Lost Date: {item.date}</p></div>
          <div className='flex items-center gap-2'><FaAlignLeft /><p className="text-black text-lg font-medium font-inter"> Description: {item.description}</p></div>
          <div className='flex items-center gap-2'>
            {item.Status === 'Active' && <FaCheckCircle className="text-green-500" />}
            {item.Status === 'Inactive' && <FaTimesCircle className="text-red-500" />}
            {item.Status === 'Pending' && <FaClock className="text-yellow-500" />}
            <p className={`text-lg font-medium font-inter ${
              item.Status === 'Active' ? 'text-green-500' :
              item.Status === 'Inactive' ? 'text-red-500' :
              'text-yellow-500'
            }`}>
              Status: {item.Status}
            </p>
          </div>

            <button
            onClick={() => handleDeleteItem(item,setItems,setClaims,toast)}
            className="bg-red-600 flex items-center gap-2 text-white rounded-md px-4 py-2 mt-2 hover:bg-red-700"
          >
            <FaTrashAlt /> Delete Item
          </button>
          <button className='text-blue-900 text-lg font-medium font-inter flex items-center' onClick={() => handleVisibility(item)}>
            View Claim
            {claimsVisibility[item.id]? (
              <FaChevronUp className="cursor-pointer mt-2 ml-2" />
            ) : (
              <FaChevronDown className="cursor-pointer mt-2 ml-2" />
            )}
          </button> 
        </div>
        </div>
        {claimsVisibility[item.id] ? 
         <div className="mt-4 flex  flex-wrap">
          {itemClaims && itemClaims.map((claim ) => (
            <div key={claim.id} className="bg-gray-200 rounded-lg w-auto flex p-4 my-2">
              
              <div className="w-1/3 pr-4">
                <img
                  src={claim.image_proof || defaultUserImage}
                  alt="Image proof"
                  className="w-full h-full object-cover rounded-lg mb-2"
                />
              </div>
              <div className="w-2/3 h-3/4 flex flex-wrap items-center gap-6">
                <div className='flex items-center gap-2'><FaUser /><p className="text-black text-lg font-medium font-inter"> Claimed By: {getUserName(claim.user_id,users)}</p></div>
                <div className='flex items-center gap-2'><FaInfoCircle /><p className="text-black text-lg font-medium font-inter"> Description: {claim.description_proof}</p></div>
                <div className='flex items-center gap-2'><FaInfoCircle /> <p className="text-black text-lg font-medium font-inter">Category: {getCategoryName(claim.category_id)}</p></div>
                <div className='flex items-center gap-2'><FaMapMarkerAlt /><p className="text-black text-lg font-medium font-inter"> Location: {claim.location}</p></div>
                <div className='flex items-center gap-2'>
                  {claim.Status === 'Active' && <FaCheckCircle className="text-green-500" />}
                  {claim.Status === 'Inactive' && <FaTimesCircle className="text-red-500" />}
                  {claim.Status === 'Pending' && <FaClock className="text-yellow-500" />}
                  <p className={`text-lg font-medium font-inter ${
                    claim.Status === 'Active' ? 'text-green-500' :
                    claim.Status === 'Inactive' ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    Status: {claim.Status}
                  </p>
                </div>
                <button
                  onClick={() => handleAdminClaim(claim,item,items,claims,setItems,setClaims,toast)}
                  className="bg-gray-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-gray-700 flex items-center gap-4"
                >
                  <FaCheckCircle/>
                  Mark as Claimed
                </button>
                <button
                  onClick={() => handleRejectClaim(claim,claims,setClaims,toast)}
                  className="bg-yellow-600 hover:bg-yellow-500 pl-8 text-white rounded-md px-4 py-2 mt-2 flex items-center gap-4 "
                >
                  <MdCancel/>
                  Reject Claim
                </button>
                <button
                  onClick={() => handleDeleteClaim(claim,setClaims,toast)}
                  className="bg-red-600 hover:bg-red-500 pl-8 text-white rounded-md px-4 py-2 mt-2 flex items-center gap-4 "
                >
                  <FaTrashAlt/>
                  Delete Claim
                </button>
              </div>
            </div>
          ))} 
        </div> : null } 
      </div>
    );
  });
  

  return (
    <div className="bg-gradient-to-r bg-green-100 min-h-screen flex">
      <AdminNavProfile/>
      <div className="flex-1 p-8 overflow-y-auto mt-20">{itemAndClaims}</div>
      <Toaster toastOptions={{ duration: 4000 }} />
    </div>
  );
};

export default AdminPanel;
