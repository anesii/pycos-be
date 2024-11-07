import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username } = req.body;

        // Implement your logic to update the username in the database
        // For example, using a database client to update the user record

        return res.status(200).json({ message: 'Username updated successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}