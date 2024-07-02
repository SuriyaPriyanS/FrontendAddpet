// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyAWnzyoNN6aS5hFz9MDrBlVCwAn917w73c",
  authDomain: "auctionpalfrom.firebaseapp.com",
  projectId: "auctionpalfrom",
  storageBucket: "auctionpalfrom.appspot.com",
  messagingSenderId: "429251935618",
  appId: "1:429251935618:web:dfbd1d6f1b11ba3307239b"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
 export {auth, app
  
 };