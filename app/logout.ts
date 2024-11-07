import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Implement your logic to log out the user
        // For example, clearing the session or token

        return res.status(200).json({ message: 'Logged out successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}