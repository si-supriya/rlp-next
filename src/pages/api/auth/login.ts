import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Mock authentication logic
    if (email && password) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: 'mock-jwt-token',
        user: { id: 1, email }
      });
    } else {
      res.status(400).json({ error: 'Email and password are required' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
