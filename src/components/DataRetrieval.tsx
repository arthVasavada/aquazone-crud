import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

const DataRetrieval = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null); // User being edited
  const [editForm, setEditForm] = useState<any>({});
  const usersCollectionRef = collection(db, "users");

  // Fetch user data from Firestore
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const usersList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  // Handle Edit Button Click
  const handleEdit = (user: any) => {
    setEditingUser(user);
    setEditForm(user); // Populate the form with the selected user's data
  };

  // Handle Save Edited User
  const handleSave = async () => {
    try {
      const userDoc = doc(db, "users", editingUser.id); // Get Firestore doc reference
      await updateDoc(userDoc, editForm); // Update Firestore document
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...editForm } : u))
      );
      setEditingUser(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle Delete Button Click
  const handleDelete = async (userId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const userDoc = doc(db, "users", userId); // Get Firestore doc reference
      await deleteDoc(userDoc); // Delete the document from Firestore
      setUsers((prev) => prev.filter((user) => user.id !== userId)); // Update UI
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">First Name</th>
            <th scope="col" className="px-6 py-3">Last Name</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">Pincode</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={user.id}>
              <td className="px-6 py-4">{user.Firstname}</td>
              <td className="px-6 py-4">{user.Lastname}</td>
              <td className="px-6 py-4">{user.Phoneno}</td>
              <td className="px-6 py-4">{user.Address}</td>
              <td className="px-6 py-4">{user.City}</td>
              <td className="px-6 py-4">{user.Pincode}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingUser && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Edit User</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editForm.Firstname || ""}
              onChange={(e) => setEditForm({ ...editForm, Firstname: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="First Name"
            />
            <input
              type="text"
              value={editForm.Lastname || ""}
              onChange={(e) => setEditForm({ ...editForm, Lastname: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="Last Name"
            />
            <input
              type="text"
              value={editForm.Phoneno || ""}
              onChange={(e) => setEditForm({ ...editForm, Phoneno: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="Phone Number"
            />
            <input
              type="text"
              value={editForm.Address || ""}
              onChange={(e) => setEditForm({ ...editForm, Address: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="Address"
            />
            <input
              type="text"
              value={editForm.City || ""}
              onChange={(e) => setEditForm({ ...editForm, City: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="City"
            />
            <input
              type="text"
              value={editForm.Pincode || ""}
              onChange={(e) => setEditForm({ ...editForm, Pincode: e.target.value })}
              className="block w-full px-4 py-2 border rounded-lg"
              placeholder="Pincode"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataRetrieval;
