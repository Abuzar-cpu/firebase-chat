import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import { getDatabase, set, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyAgazB4IpxX6W5jzBXUZ8ni9zNpEx2HqX0",

  authDomain: "test-a4bfa.firebaseapp.com",

  databaseURL: "https://test-a4bfa-default-rtdb.firebaseio.com",

  projectId: "test-a4bfa",

  storageBucket: "test-a4bfa.appspot.com",

  messagingSenderId: "721451825884",

  appId: "1:721451825884:web:4ba6b5b2190712815a1219",

  measurementId: "G-90ZQK9MF81"

};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export {
    set, ref, onValue, push, remove
}