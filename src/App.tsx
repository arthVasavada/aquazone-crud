import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import Auth from "./components/Auth";
import DataGeneration from "./components/DataGeneration";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const sessionTimeout = 5 * 60 * 1000; // 30 minutes

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(setUser);

    // Set up a session timeout to log the user out after the specified duration
    let timeout: NodeJS.Timeout;
    if (user) {
      timeout = setTimeout(() => {
        signOut(auth);
        alert("Session has expired. You have been logged out.");
      }, sessionTimeout);
    }

    // Clean up the timeout and unsubscribe from auth listener on component unmount
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [user]);

  return (
    <main className="flex flex-col bg-gradient-to-t from-neutral-400 to-neutral-200 items-center justify-between h-screen w-full">
      <section className="flex flex-col sm:flex-row w-full items-center justify-between p-6 sm:p-10">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-t from-cyan-600 to-blue-400 inline-block text-transparent bg-clip-text text-center sm:text-left">
          AQUAZONE
        </h1>

        <button
          onClick={() => signOut(auth)}
          type="button"
          className="mt-6 sm:mt-0 sm:ml-6 text-slate-50 bg-gradient-to-r from-blue-700 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-6 py-2 sm:px-8 sm:py-0 lg:px-10 lg:py-2 h-10 self-center"
        >
          Sign Out
        </button>
      </section>

      <section className="w-full p-10">
        {user ? <DataGeneration /> : <Auth />}
      </section>
    </main>
  );
};

export default App;
