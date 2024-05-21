import * as jwt from 'jsonwebtoken';
// Define the secret key for signing the JWT token
const secret = `${process.env.JWT_FACESWAP_SECRET_KEY}`;
// Function to generate a JWT token
export const generateToken = () => {
  // Generate and return the JWT token
  return jwt.sign({}, secret, { expiresIn: '120s' });
};
