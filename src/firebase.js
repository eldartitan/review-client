import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwPFzf9lsZ3lkMAp1wBU1fDwfu8IMNtmM",
  authDomain: "reviews-aee9e.firebaseapp.com",
  projectId: "reviews-aee9e",
  storageBucket: "reviews-aee9e.appspot.com",
  messagingSenderId: "841103046327",
  appId: "1:841103046327:web:3f47b5a85fcee9d959bf32",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
