import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'API endpoints available',
    endpoints: {
      health: '/api/health',
      auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
      },
    },
  });
}
