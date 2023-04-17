
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC8TUuzw5S9vX9wyndGYxcvxD-iWDYeY9o",
  authDomain: "emart-f9f92.firebaseapp.com",
  projectId: "emart-f9f92",
  storageBucket: "emart-f9f92.appspot.com",
  messagingSenderId: "329037413133",
  appId: "1:329037413133:web:ba9c605d0af67e30d9ce44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;