import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyDvkn3KjXoqjKUtYNZiQVN4qf3FBqMoWPY',
    authDomain: 'bitoralce-development.firebaseapp.com',
    projectId: 'bitoralce-development',
    storageBucket: 'bitoralce-development.appspot.com',
    messagingSenderId: '1094638928869',
    appId: '1:1094638928869:web:654731f62755abffb7a50c'
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;