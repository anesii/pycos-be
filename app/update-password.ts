import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { password, newPassword } = req.body;

        // Implement your logic to update the password in the database
        // Ensure to validate the current password and hash the new password

        return res.status(200).json({ message: 'Password updated successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}