import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";

const DataGeneration = () => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhoneNo, setNewPhoneNo] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const usersCollectionRef = collection(db, "users");

  const validateFirstName = (name) => name.trim() !== "";
  const validateLastName = (name) => name.trim() !== "";
  const validatePhoneNo = (phone) => /^\d{10}$/.test(phone);
  const validateAddress = (address) => address.trim() !== "";
  const validateCity = (city) => city.trim() !== "";
  const validatePincode = (pincode) => /^[A-Za-z0-9]{6}$/.test(pincode);

  const handleBlur = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
        newErrors.firstName = validateFirstName(newFirstName) ? "" : "First name is required";
        break;
      case "lastName":
        newErrors.lastName = validateLastName(newLastName) ? "" : "Last name is required";
        break;
      case "phoneNo":
        newErrors.phoneNo = validatePhoneNo(newPhoneNo) ? "" : "Phone number must be exactly 10 digits";
        break;
      case "address":
        newErrors.address = validateAddress(newAddress) ? "" : "Address is required";
        break;
      case "city":
        newErrors.city = validateCity(newCity) ? "" : "City is required";
        break;
      case "pincode":
        newErrors.pincode = validatePincode(newPincode) ? "" : "Pincode must be 6 alphanumeric characters";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const createUser = async () => {
    const formValid = Object.values(errors).every((error) => error === "");
    if (!formValid) return;

    try {
      await addDoc(usersCollectionRef, {
        Firstname: newFirstName,
        Lastname: newLastName,
        Phoneno: newPhoneNo,
        Address: newAddress,
        City: newCity,
        Pincode: newPincode,
      });

      // Show success message and reset form fields
      setSuccessMessage("User created successfully!");
      setNewFirstName("");
      setNewLastName("");
      setNewPhoneNo("");
      setNewAddress("");
      setNewCity("");
      setNewPincode("");
      setErrors({}); // Clear any existing errors
    } catch (error) {
      console.error("Error creating user: ", error);
      setSuccessMessage(""); // Clear success message on error
    }
  };

  const inputClass = (field) =>
    `bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
      errors[field] ? "border-red-500 focus:border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="flex flex-col gap-5 justify-center items-center p-5">
      <div className="w-fit shadow-[rgba(0,0,1,0.2)_0px_0px_40px_10px] sm:rounded-lg p-5">
        <div className="grid gap-6 mb-6 md:grid-cols-3 text-center">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
              First name
            </label>
            <input
              onChange={(e) => setNewFirstName(e.target.value)}
              onBlur={() => handleBlur("firstName")}
              type="text"
              id="first_name"
              value={newFirstName}
              className={inputClass("firstName")}
              placeholder="John"
              required
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
              Last name
            </label>
            <input
              onChange={(e) => setNewLastName(e.target.value)}
              onBlur={() => handleBlur("lastName")}
              type="text"
              id="last_name"
              value={newLastName}
              className={inputClass("lastName")}
              placeholder="Doe"
              required
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="phoneno" className="block mb-2 text-sm font-medium text-gray-900">
              Phone no
            </label>
            <input
              onChange={(e) => setNewPhoneNo(e.target.value)}
              onBlur={() => handleBlur("phoneNo")}
              type="text"
              id="phoneno"
              value={newPhoneNo}
              className={inputClass("phoneNo")}
              placeholder="1234567890"
              required
            />
            {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
          </div>
          <div>
            <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              onChange={(e) => setNewAddress(e.target.value)}
              onBlur={() => handleBlur("address")}
              type="text"
              id="Address"
              value={newAddress}
              className={inputClass("address")}
              placeholder="Address..."
              required
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900">
              City
            </label>
            <input
              onChange={(e) => setNewCity(e.target.value)}
              onBlur={() => handleBlur("city")}
              type="text"
              id="City"
              value={newCity}
              className={inputClass("city")}
              placeholder="City"
              required
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="zip-input" className="block mb-2 text-sm font-medium text-gray-900">
              Pincode
            </label>
            <input
              onChange={(e) => setNewPincode(e.target.value)}
              onBlur={() => handleBlur("pincode")}
              type="text"
              id="zip-input"
              value={newPincode}
              className={inputClass("pincode")}
              placeholder="ABC123 or 123ABC"
              required
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
        </div>
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        <div className="flex justify-center">
          <button
            onClick={createUser}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataGeneration;
