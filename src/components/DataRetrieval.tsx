/* This code snippet is a TypeScript React component that fetches user data from a Firestore database
using Firebase SDK. Here's a breakdown of what the code is doing: */
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";

const DataRetrieval = () => {
  /* `const [users, setUsers] = useState<any[]>([]);` is declaring a state variable `users` using the
 `useState` hook in React. The `users` state will hold an array of user data fetched from the
 Firestore database. The `setUsers` function is used to update the `users` state. */
  const [users, setUsers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "users");

  /* The `useEffect` hook in the code snippet is responsible for fetching user data from a Firestore
database when the component mounts. Here's a breakdown of what it's doing: */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const usersList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log("Fetched users:", usersList); // Log to check structure
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const onClickChange = async() =>{

  }

  const onClickDelete = async() =>{

  }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Pincode
            </th>
            <th scope="col" className="px-6 py-3">
              
            </th>
            <th scope="col" className="px-6 py-3">
              
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={user.id}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {user.Firstname}
              </th>
              <td className="px-6 py-4">{user.Lastname}</td>
              <td className="px-6 py-4">{user.Phoneno}</td>
              <td className="px-6 py-4">{user.Address}</td>
              <td className="px-6 py-4">{user.City}</td>
              <td className="px-6 py-4">{user.Pincode}</td>
              <td className="px-6 py-4"><button className="text-blue-600" onClick={onClickChange}>Edit</button></td>
              <td className="px-6 py-4"><button className="text-red-600" onClick={onClickDelete}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default DataRetrieval;
