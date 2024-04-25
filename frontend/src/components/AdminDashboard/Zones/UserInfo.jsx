/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

export default function UserInfo({searchQuery,setSearchQuery, filteredUsers, handleEditClick, editingUserId, editedRole, setEditedRole, editedStatus, setEditedStatus, handleSaveEdit, handleCancelEdit }) {
    return (
        <div className="w-3/4 mx-auto mt-8 ml-40">
        
            <div className="w-full bg-green-100 rounded-3xl overflow-hidden shadow-lg  my-4">
                {/* Search Bar */}
                <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                            <FaSearch size={24} />
                        </div>
                        <div className="w-full ">
                            
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2 px-12 border-b border-black gap-2.5 rounded-3xl focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    
                </div>
            </div>
            <div className="">
                <table className="table-auto min-w-full bg-white border border-gray-300 shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700">Role</th>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700">Name</th>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700">Email</th>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700 border-b">Phone Number</th>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700 border-b">Status</th>
                            <th className="py-2 px-4 bg-indigo-100 text-indigo-700 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 mt-4 border-b">{user.id === editingUserId ? (
                                        <input
                                            type="text"
                                            value={editedRole}
                                            onChange={(e) => setEditedRole(e.target.value)}
                                        />
                                    ) : (
                                        user.role
                                    )}</td>
                                    <td className="py-2 px-4 mt-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.phone_number}</td>
                                    <td className="py-2 px-4 mt-4 border-b">{user.id === editingUserId ? (
                                        <input
                                            type="text"
                                            value={editedStatus}
                                            onChange={(e) => setEditedStatus(e.target.value)}
                                        />
                                    ) : (
                                        user.status
                                    )}</td>

                                    <td className="py-2 px-4 mt-4 border-b">
                                        {user.id === editingUserId ? (
                                            <>
                                                <button onClick={handleSaveEdit} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                                <button onClick={handleCancelEdit} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditClick(user.id, user.role, user.status)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-2 px-4 text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

