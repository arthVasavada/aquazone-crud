import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full my-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full my-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full my-2">
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-500 w-full my-2"
        >
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
