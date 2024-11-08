import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import Auth from "./components/Auth";
import DataRetrieval from "./components/DataRetrieval";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col bg-gradient-to-t from-neutral-400 to-neutral-200 items-center justify-between h-screen w-screen ">
      <section className="flex flex-row w-full justify-between p-10">
        <h1 className="text-9xl font-black bg-gradient-to-t from-cyan-600 to-blue-400 inline-block text-transparent bg-clip-text">
          AQUAZONE
        </h1>
        <button onClick={()=>signOut(auth)}>Sign Out</button>
      </section>
      <section className="w-full p-10">
        {user ? <DataRetrieval /> : <Auth />}
      </section>
    </main>
  );
};

export default App;
