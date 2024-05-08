/* eslint-disable react/prop-types */
// Import necessary dependencies
import  { useState,useEffect } from "react";
import AdminNavProfile from "../../Admin/AdminNavProfile";
import UserStatisticCard from "../StatitisticCards/UserStatisticCard";
import UserInfo from "../Zones/UserInfo";
import { useDispatch } from "react-redux";
import { fetchLostAndFound } from "../../../../redux/lostandfoundSlicer";
import updateByValue from "../../../services/stateUpdaters/update";


const UserDashboard = () => {
  const dispatch=useDispatch();
  const[users,setUsers]=useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

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


  const getTotalUsers = () => users.length;
  const getActiveUsers = () => users && users.filter((user) => user.status === "Active").length;
  const getInactiveUsers = () =>users && users.filter((user) => user.status === "Inactive").length;

  const filteredUsers =users && users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleEditClick = (userId, currentRole, currentStatus) => {
    setEditingUserId(userId);
    setEditedRole(currentRole);
    setEditedStatus(currentStatus);
  };

  const handleSaveEdit = () => {
    const user_id = parseInt(editingUserId);
    const requestBody = {};

    if (editedRole !== "") {
      requestBody.role = editedRole;
    }
    if (editedStatus !== "") {
      requestBody.status = editedStatus;
    }

    fetch(`http://localhost:5000/users/${user_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const updatedUser=data.user;
        const updatedUsers=updateByValue(users,updatedUser);
        setUsers(updatedUsers);
  
        // getUsers();
      });

    setEditingUserId(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <>
    <AdminNavProfile/>
    <div className="flex flex-row h-full bg-white">
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* User Statistics */}
        <UserStatisticCard
          getTotalUsers={getTotalUsers}
          getActiveUsers={getActiveUsers}
          getInactiveUsers={getInactiveUsers}
        />

        {/* User Information */}
        <UserInfo
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredUsers={filteredUsers}
          handleEditClick={handleEditClick}
          editingUserId={editingUserId}
          editedRole={editedRole}
          setEditedRole={setEditedRole}
          editedStatus={editedStatus}
          setEditedStatus={setEditedStatus}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
