import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import Auth from "./components/Auth";
import DataGeneration from "./components/DataGeneration";
import DataRetrieval from "./components/DataRetrieval";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [selectedSection, setSelectedSection] = useState<
    "generation" | "retrieval"
  >("generation");

  useEffect(() => {
    // Simulate loading for demonstration (e.g., waiting for Firebase to initialize)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false); // Set loading to false once user is fetched
    });

    return () => unsubscribe();
  }, []);

  // Loader Component
  const Loader = () => (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-neutral-400 to-neutral-200">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (loading) return <Loader />; // Show loader until app is ready

  return (
    <main className="flex flex-col min-h-screen w-full bg-gradient-to-t from-neutral-400 to-neutral-200 items-center">
      <section className="flex flex-col items-center justify-center w-full h-full p-6 sm:p-10 space-y-8">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-t from-cyan-600 to-blue-400 inline-block text-transparent bg-clip-text text-center">
          AQUAZONE
        </h1>

        {user && (
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Logout
          </button>
        )}
      </section>

      <section className="w-full p-10">
        {user ? (
          <>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setSelectedSection("generation")}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  selectedSection === "generation"
                    ? "bg-blue-500"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                Data Generation
              </button>
              <button
                onClick={() => setSelectedSection("retrieval")}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  selectedSection === "retrieval"
                    ? "bg-blue-500"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                Data Retrieval
              </button>
            </div>
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
