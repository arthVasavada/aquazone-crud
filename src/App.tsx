import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import Auth from "./components/Auth";
import DataGeneration from "./components/DataGeneration";
import DataRetrieval from "./components/DataRetrieval";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<"generation" | "retrieval">("generation");
  const sessionTimeout = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    let timeout: NodeJS.Timeout;
    if (user) {
      timeout = setTimeout(() => {
        signOut(auth);
        alert("Session has expired. You have been logged out.");
      }, sessionTimeout);
    }

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [user]);

  return (
    <main className="flex flex-col min-h-screen w-full bg-gradient-to-t from-neutral-400 to-neutral-200 items-center justify-center">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center space-y-4 p-6 sm:p-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-t from-cyan-600 to-blue-400 inline-block text-transparent bg-clip-text text-center">
          AQUAZONE
        </h1>

        {/* Show Logout button only if user is logged in */}
        {user && (
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Logout
          </button>
        )}
      </section>

      {/* Section Navigation (Visible when user is logged in) */}
      <section className="w-full p-4 sm:p-10">
        {user ? (
          <>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setSelectedSection("generation")}
                className={`px-6 py-3 rounded-lg text-white font-medium ${
                  selectedSection === "generation"
                    ? "bg-blue-500"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                Data Generation
              </button>
              <button
                onClick={() => setSelectedSection("retrieval")}
                className={`px-6 py-3 rounded-lg text-white font-medium ${
                  selectedSection === "retrieval"
                    ? "bg-blue-500"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                Data Retrieval
              </button>
            </div>

            {/* Render the selected section */}
            {selectedSection === "generation" ? (
              <DataGeneration />
            ) : (
              <DataRetrieval />
            )}
          </>
        ) : (
          <Auth />
        )}
      </section>
    </main>
  );
};

export default App;
