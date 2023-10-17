import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import './env.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import router from './routes/router.js';
import verifyApiKey from './middlewares/verifyApiKey.js';
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

app.use('/api', router);

app.use(verifyApiKey);

// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.post('/register', async (req, res) => {
  const { password } = req.body;
  // Using callbak
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(password, salt, function (error, hashPassword) {
  //     hash = hashPassword;
  //     console.log(hash);
  //     res.send(hash);
  //   });
  // });

  // Using async await (recommended)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  res.send(hashedPassword);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(
    req.body,
    `select email, password from users where email='${email}' and password='${password}'`
  );
  // without mysql.escape
  // connection.query(
  //   `select email, password from users where email='${email}' and password='${password}'`,
  //   (err, results, fields) => {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //     console.log(results);
  //     return res.send(results);
  //   }
  // );
  // with mysql.escape
  //   connection.query(
  //   `select email, password from users where email=${mysql.escape(
  //       email
  //     )} and password=${mysql.escape(password)}`,
  //     (err, results, fields) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }
  //       console.log(results);
  //       return res.send(results);
  //     }
  //   );
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
