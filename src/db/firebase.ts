import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUMa6Sol--J-QllNJ570GnPQz86n_9lLU",
  authDomain: "design-chrome-extension.firebaseapp.com",
  projectId: "design-chrome-extension",
  storageBucket: "design-chrome-extension.appspot.com",
  messagingSenderId: "993116929592",
  appId: "1:993116929592:web:975af1d92a04ebc728f0cd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
