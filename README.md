
```markdown
# **Aquazone CRUD Application**

Aquazone is a full-stack web application built using **React**, **Vite**, and **Firebase**. It allows users to **create**, **read**, **update**, and **delete** data entries. The app features user authentication via **Firebase Authentication** and uses **Firebase Firestore** as the database to store and retrieve data.

---

## **Features**

- **User Authentication**: Users can sign up, log in, and securely access the application.
- **Data Generation**: Users can create new data entries through a simple form.
- **Data Retrieval**: View the list of data entries in a dynamic table.
- **Data Editing**: Users can edit existing data entries.
- **Data Deletion**: Users can delete data entries.
- **Session Management**: Automatic logout after 5 minutes of inactivity for security.

---

## **Technologies Used**

- **Frontend**: 
  - React
  - Vite (for fast development and bundling)
  - TailwindCSS (for styling)
- **Backend**:
  - Firebase Authentication (for user authentication)
  - Firebase Firestore (for storing and retrieving data)
- **Tools**:
  - Node.js
  - npm (Node Package Manager)

---

## **Installation**

### **1. Clone the repository**
First, clone the repository to your local machine:

```bash
git clone https://github.com/arthVasavada/aquazone-crud.git
```

### **2. Install dependencies**
Navigate to the project directory and install the required dependencies using npm:

```bash
cd aquazone-crud
npm install
```

### **3. Set up Firebase**

- Create a Firebase project by going to [Firebase Console](https://console.firebase.google.com/).
- Set up **Firebase Authentication** and **Firestore Database** in your Firebase console.
- Get your Firebase config object from the Firebase Console and add it to the environment variables for security.

### **4. Set up environment variables**

Create a `.env` file in the root of the project and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### **5. Update Firebase config file**

In the `src/firebaseConfig.ts` file, update the Firebase configuration to use the environment variables:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Access Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**Note**: Make sure that the `.env` file is added to `.gitignore` to prevent sensitive keys from being pushed to GitHub.

### **6. Run the application**
Once everything is set up, you can start the development server with Vite:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

---

## **Usage**

- **Sign Up / Log In**: Users can sign up or log in using Firebase Authentication.
- **Data Generation**: After logging in, users can generate data through the provided form. Each entry is stored in Firestore.
- **Data Retrieval**: Users can view the list of data in a table format.
- **Data Editing / Deletion**: Each row in the table contains an option to edit or delete the corresponding entry.
- **Session Timeout**: The app logs out the user automatically after 5 minutes of inactivity.

---

## **Contributing**

Contributions to this project are welcome! Feel free to fork the repository, create a branch, and submit a pull request with your improvements or bug fixes.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**

- Firebase for Authentication and Firestore.
- React and TailwindCSS for building the UI.
- Vite for faster development and bundling.
- Open-source community for continuous support and resources.

---

### **Future Improvements**

- Implement form validation for data entry.
- Add a "search" or "filter" feature for data retrieval.
- Implement more complex data relationships (e.g., adding multiple fields with data references).
```

### Key Modifications:

1. **Mention Vite**: Now, the README clearly states that the project uses **Vite** as the build tool.
2. **Environment Variables**: Instructions are added for setting up environment variables with Firebase keys securely.
3. **Configuration File Updates**: The Firebase configuration in the `firebaseConfig.ts` is updated to fetch keys from environment variables, ensuring sensitive information is not hardcoded.
4. **Vite Commands**: Instructions to run the app using `npm run dev`, as it’s the default script for Vite.

