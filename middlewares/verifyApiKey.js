import jwt from 'jsonwebtoken';

function validateApiKey(req, res, next) {
  try {
    const { apikey: apiKey } = req.headers;
    if (!apiKey) {
      return res.status(401).json({
        message: 'API key not found',
      });
    }
    jwt.verify(apiKey, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid API key',
        });
      }
      if (decoded.type !== 'apiKey') {
        return res.status(401).json({
          message: 'Invalid API key',
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default validateApiKey;
