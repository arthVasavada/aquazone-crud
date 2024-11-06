import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";

const DataUpdation = () => {
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newPhoneNo, setNewPhoneNo] = useState<number>(0);
  const [newAddress, setNewAddress] = useState<string>("");
  const [newCity, setNewCity] = useState<string>("");
  const [newPincode, setNewPincode] = useState<string>("");

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Firstname: newFirstName,
      Lastname: newLastName,
      Phoneno: newPhoneNo,
      Address: newAddress,
      City: newCity,
      Pincode: newPincode,
    });
  };

  return (
    <div className="flex flex-row gap-5 justify-evenly p-5">
      <input
        onChange={(event) => {
          setNewFirstName(event.target.value);
        }}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="First Name..."
        required
      />
      <input
        onChange={(event) => {
          setNewLastName(event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Last Name..."
      />
      <input
        type="number"
        onChange={(event) => {
          setNewPhoneNo(event.target.valueAsNumber);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Phone no..."
      />
      <input
        onChange={(event) => {
          setNewAddress(event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Address..."
      />
      <input
        onChange={(event) => {
          setNewCity(event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="City..."
      />
      <input
        onChange={(event) => {
          setNewPincode(event.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        
        placeholder="Pincode..."
      />
      <button
        onClick={createUser}
        className="relative inline-flex items-center justify-center p-.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Create User
        </span>
      </button>
    </div>
  );
};

export default DataUpdation;
