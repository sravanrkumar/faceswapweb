import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { generateToken } from '@/hooks/UseJWT';
const pixellaburl = `${process.env.NEXT_PUBLIC_PIXELLAB_API_URL}`;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = generateToken();
        let url =`${pixellaburl}/user-contact`;
       const response:any =  await axios.post(url, req.body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       if(response != undefined && (response?.status == 201 || response?.status == 200)){
        res.status(200).json({'status':'Success'});
       }else {
        res.status(200).json({'status':'Failed'});
       }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
