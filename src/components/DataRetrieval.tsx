/* This code snippet is a TypeScript React component that fetches user data from a Firestore database
using Firebase SDK. Here's a breakdown of what the code is doing: */
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";

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
        const usersList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        
        console.log("Fetched users:", usersList); // Log to check structure
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col">
        {users.map((user) => {
          return <div key={user.id} className="flex flex-row gap-5 justify-evenly"><h1 className="text-2xl font-sans font-black">First Name:<h2 className="text-2xl font-sans font-medium">{user.Firstname}</h2></h1>
          <h1 className="text-2xl font-sans font-black">Last Name:<h2 className="text-2xl font-sans font-medium">{user.Lastname}</h2></h1>
          <h1 className="text-2xl font-sans font-black">Phone Number:<h2 className="text-2xl font-sans font-medium">{user.Phoneno}</h2></h1>
          <h1 className="text-2xl font-sans font-black">Address:<h2 className="text-2xl font-sans font-medium">{user.Address}</h2></h1>
          <h1 className="text-2xl font-sans font-black">City:<h2 className="text-2xl font-sans font-medium">{user.City}</h2></h1>
          <h1 className="text-2xl font-sans font-black">Pincode:<h2 className="text-2xl font-sans font-medium">{user.Pincode}</h2></h1>
          </div>;
        })}
      </div>
  )
}

export default DataRetrieval