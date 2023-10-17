import express from 'express';
import jwt from 'jsonwebtoken';
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
    res.status(200).json({
      key,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
