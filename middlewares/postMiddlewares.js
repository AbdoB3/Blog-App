const fs = require('fs')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

if (!token) {  
    return res.status(401).send('Login first');
}

const tokenValue = token.slice(7); // Remove 'Bearer ' prefix

try {
    decodedToken = jwt.verify(tokenValue, 'secret_key');
    next();
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).send('Unauthorized: Token expired');
    }
}
  };

  const authorize = (requiredRole) => {
    return (req, res, next) => {
      const token = req.headers.authorization;
      const tokenValue = token.slice(7);
  
      if (!tokenValue) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Verify JWT token
      jwt.verify(tokenValue, 'secret_key' , (err, decoded) => {
        
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        // Check if user has required role
        if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Forbidden admin role' });
        }
        next();
      });
    };
  };
  
  const logs = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenValue = token.slice(7);

    jwt.verify(tokenValue, 'secret_key' , (err, decoded) => {
      let log = `Id User: ${decoded.user} [${new Date().toISOString()}] ${req.method} ${req.url} \n`;
      fs.appendFileSync("logs.txt", log, "utf8");
      next();
    });
};



module.exports = {authenticateUser, logs,authorize};