import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";

const DataGeneration = () => {
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
    <div className="flex flex-col gap-5 justify-items-center p-5  items-center">
      <div className="w-fit shadow-[rgba(0,0,1,0.2)_0px_0px_40px_10px] sm:rounded-lg p-5">
      <div className="grid gap-6 mb-6 md:grid-cols-3 text-center">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <input
            onChange={(event) => {
              setNewFirstName(event.target.value);
            }}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John"
            required
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <input
            onChange={(event) => {
              setNewLastName(event.target.value);
            }}
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Doe"
            required
          />
       
        </div>
        <div>
      <label
        htmlFor="phoneno"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Phone no
      </label>
     
        <input
          onChange={(event) => {
            setNewPhoneNo(event.target.valueAsNumber);
          }}
          type="number"
          id="phoneno"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="12345 or 12345-6789"
          pattern="^\d{5}(-\d{4})?$"
          required
        />
      </div>
        <div>
        <label
          htmlFor="Address"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Address
        </label>
        <input
          onChange={(event) => {
            setNewAddress(event.target.value);
          }}
          type="text"
          id="Address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Address..."
          required
        />
        </div>
        <div>
        <label
          htmlFor="City"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          City
        </label>
        <input
          onChange={(event) => {
            setNewCity(event.target.value);
          }}
          type="text"
          id="City"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="City"
          required
        />
    </div>
    <div>
      <label
        htmlFor="zip-input"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Pincode
      </label>
     
        <input
          onChange={(event) => {
            setNewPincode(event.target.value);
          }}
          type="text"
          id="zip-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder="12345 or 12345-6789"
          pattern="^\d{5}(-\d{4})?$"
          required
        />
      </div>
      </div>
      <button
        onClick={createUser}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-5"
      >
        Create User
      </button>
      </div>
  </div>
    
  );
};

export default DataGeneration;
