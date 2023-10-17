import express from 'express';
import jwt from 'jsonwebtoken';
import {db} from '../index.js';
import { addDoc,collection } from 'firebase/firestore';
const router = express.Router();

// GET route that returns "Hello World"
router.get('/api-key', async (req, res) => {
  try {
    const key = jwt.sign(
      {
        type: 'apiKey',
        createdAt: new Date(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    res.status(200).json({
      key,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
