// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEihvVXNMMSoTw6qiL8DWMopShmcSTc6o",
  authDomain: "koichamp-2b53d.firebaseapp.com",
  projectId: "koichamp-2b53d",
  storageBucket: "koichamp-2b53d.appspot.com",
  messagingSenderId: "17612167972",
  appId: "1:17612167972:web:4510784ea752243a3d71b1",
  measurementId: "G-X18FD47BED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };