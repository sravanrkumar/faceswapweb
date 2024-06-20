import { NextApiRequest, NextApiResponse } from 'next';
const pixellaburl = `${process.env.NEXT_PUBLIC_PIXELLAB_API_URL}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Get user's IP address
        const userIPAddress = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '').split(',')[0].trim();

        // Fetch user IP information from the external API
        const response = await fetch(`${pixellaburl}/user-ip?user_ip=${userIPAddress}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache', // Disable caching
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON data
        const data = await response.json();
        
        // Send the response back to the client
        res.status(200).json({ count: data.result, ip: userIPAddress });
    } catch (error) {
        // Send an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
