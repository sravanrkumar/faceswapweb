import * as jwt from 'jsonwebtoken';
// Define the secret key for signing the JWT token
const secret = 'aappthitech@#at@$g#HJk#HvRhdf67df^F55T$fTr7*hfr5tg';
// Function to generate a JWT token
export const generateToken = () => {
  // Generate and return the JWT token
  return jwt.sign({}, secret, { expiresIn: '1h' });
};
