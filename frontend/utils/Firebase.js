import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginecommerce-9faed.firebaseapp.com",
  projectId: "loginecommerce-9faed",
  storageBucket: "loginecommerce-9faed.appspot.com",
  messagingSenderId: "314701009952",
  appId: "1:314701009952:web:cf1fd90992a3d165d91845",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export { auth, provider };
