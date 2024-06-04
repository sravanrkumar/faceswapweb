import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { generateToken } from '@/hooks/UseJWT';
import { ENDPOINTS, getPhotoProcessingEndpointUrl, getVideoProcessingEndpointUrl } from '@/constants/endpoints'; // Adjust the path as necessary
const imageAppName = `${process.env.NEXT_PUBLIC_IMAGE_PROCESSING_APP_NAME}`;
const videoAppNmae = `${process.env.NEXT_PUBLIC_VIDEO_PROCESSING_APP_NAME}`;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result_id = req.body.result_id;
        const token = req.headers.authorization;
        const catImgName = req.body.catImgName;
        const ext = catImgName.split('.');
        const apiUrl = ext[1] === 'gif'
        ? getVideoProcessingEndpointUrl(`${ENDPOINTS.result}/${videoAppNmae}/${result_id}`) 
        : getPhotoProcessingEndpointUrl(`${ENDPOINTS.result}/${imageAppName}/${result_id}`);
        const headers = {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get(apiUrl, {
            headers: headers,
            responseType: 'arraybuffer', // Important for handling binary data
        });

        if (response && response.data) {
            const base64String = Buffer.from(response.data, 'binary').toString('base64');
            res.status(200).json({ image: base64String });
        } else {
            res.status(500).json({ error: 'Internal Server Error. Try again after some time.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
