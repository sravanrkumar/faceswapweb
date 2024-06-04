import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import { generateToken } from '@/hooks/UseJWT'; // Adjust the path as necessary
import { ENDPOINTS, getPhotoProcessingEndpointUrl, getVideoProcessingEndpointUrl } from '@/constants/endpoints'; // Adjust the path as necessary
const imageAppName = `${process.env.NEXT_PUBLIC_IMAGE_PROCESSING_APP_NAME}`;
const videoAppNmae = `${process.env.NEXT_PUBLIC_VIDEO_PROCESSING_APP_NAME}`;
// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single('sourceImage');

// Helper function to run middleware
const runMiddleware = (req:any, res:any, fn:any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result:any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, since we're using multer
  },
};

const handler = async (req:any, res:any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  await runMiddleware(req, res, uploadMiddleware);

  try {
    const categoryName = req.body.catname;
    const catImgName = req.body.catimgname;
    const token = req.headers.authorization;
    const ext = catImgName.split('.');
    const apiUrl = ext[1] === 'gif'
      ? getVideoProcessingEndpointUrl(`${ENDPOINTS.upload}/${categoryName}/${catImgName}?app_name=${videoAppNmae}&user_type=free`)
      : getPhotoProcessingEndpointUrl(`${ENDPOINTS.upload}/${categoryName}/${catImgName}?app_name=${imageAppName}`);

    //const token = generateToken();
   
    const formData = new FormData();
    formData.append('sourceImage', req.file.buffer, req.file.originalname);
    formData.append('destImage', '');

    const headers = {
      'accept': 'application/json',
      'fcmtoken': 'null',
      'x-firebase-appcheck': 'null',
      ...formData.getHeaders(),
    };

    const response = await axios.post(apiUrl, formData, { headers });

    if (response && response.data && response.data.request_id !== undefined) {
      const request_id = response.data.request_id;
      await delay(15000); // 35-second delay
      res.status(200).json({ request_id });
    } else {
      res.status(200).json({ error: 'Internal Server Error. Try again after some time' });
    }
  } catch (error:any) {
    console.error('Request error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to simulate a delay
function delay(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default handler;
