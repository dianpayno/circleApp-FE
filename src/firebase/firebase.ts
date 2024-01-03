
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCylAoaE-hZXIAlOZx5udNysiPzkF0akRA",
  authDomain: "cirlcle-app.firebaseapp.com",
  projectId: "cirlcle-app",
  storageBucket: "cirlcle-app.appspot.com",
  messagingSenderId: "615336167952",
  appId: "1:615336167952:web:0fb53a2c82f1351ed51895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const storage = getStorage(app)