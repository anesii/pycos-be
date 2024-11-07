import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        // Implement your logic to create a new user in the database
        // Ensure to validate the input and hash the password

        return res.status(200).json({ message: 'User created successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}