// src/lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  try {
    // Production дээр JWT_SECRET environment variable ашиглана
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret);
    
    // Demo users-тай харьцуулах
    const demoUsers = {
      'patient@ex.com': { role: 'patient', name: 'Patient User' },
      'doctor@ex.com': { role: 'doctor', name: 'Doctor User' }
    };
    
    if (demoUsers[decoded.email]) {
      return { 
        email: decoded.email,
        ...demoUsers[decoded.email]
      };
    }
    
    return null;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}