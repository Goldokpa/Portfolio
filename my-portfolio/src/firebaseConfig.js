import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AlzaSyBAK4GsNumtA_mrwPU-tcwtkA6_wzUFoE",
  authDomain: "portfolio-efc0a.firebaseapp.com",
  projectId: "portfolio-efc0a",
  storageBucket: "portfolio-efc0a.appspot.com",
  messagingSenderId: "6604488586091",
  appId: "1:660448586091:web:e7c13aa93631731bcd042e",
  measurementId: "G-YRD0KVWRT3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
