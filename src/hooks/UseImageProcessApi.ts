import axios from "axios";
import { generateToken } from "./UseJWT";
const UseImageProcessApi = async (url:string, data:any) => {
  try {
    const token = generateToken();
    const response = await axios.post(url, data, {
      headers: {
        'accept': 'application/json',
        'fcmtoken': 'null',
        'x-firebase-appcheck': 'null',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.data && response.data.request_id !== undefined) {
      return response.data.request_id;
    } else {
      return '';
    }
    
  } catch (error) {
    console.error('Error sending data:', error);
    throw new Error('Failed to upload image.');
  }
};

export default UseImageProcessApi;
