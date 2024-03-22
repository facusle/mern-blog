// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_KEY,
     authDomain: 'facus-blog.firebaseapp.com',
     projectId: 'facus-blog',
     storageBucket: 'facus-blog.appspot.com',
     messagingSenderId: '724658413960',
     appId: '1:724658413960:web:0282c495b2b04509d5da3d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
