import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import './env.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use

const app = express();

// config firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhu4mr1JuHMGAf8xPUFo16BJZR7tXm9Oc',
  authDomain: 'utma-sda.firebaseapp.com',
  projectId: 'utma-sda',
  storageBucket: 'utma-sda.appspot.com',
  messagingSenderId: '590082649662',
  appId: '1:590082649662:web:23c3bfdd23867045162b6f',
  measurementId: 'G-VDJR68GM9N',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// config bcrypt
const saltRounds = 15;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
