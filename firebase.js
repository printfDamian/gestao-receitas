const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: "gestao-receitas-abcd0.firebaseapp.com",
    databaseURL: "https://gestao-receitas-abcd0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gestao-receitas-abcd0",
    storageBucket: "gestao-receitas-abcd0.firebasestorage.app",
    messagingSenderId: "496264598822",
    appId: "1:496264598822:web:244fb246e731bbd3119de7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized");

module.exports = { app, auth };