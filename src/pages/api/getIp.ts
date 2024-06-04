import { NextApiRequest, NextApiResponse } from 'next';
const pixellaburl = `${process.env.NEXT_PUBLIC_PIXELLAB_API_URL}`;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
       
        // Get user's IP address
        const userIPAddress = await  (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '').split(',')[0].trim();
        // Get server's IP address
       // const serverIPAddress = req.socket.localAddress;
        const response = await fetch(`${pixellaburl}/user-ip?user_ip=${userIPAddress}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        if(response) {
            const data = await response.json();
            res.status(200).json({ count: data.result,ip:userIPAddress });
        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
