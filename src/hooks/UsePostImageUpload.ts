import axios from "axios";
const Usepostimageupload = async (url:string, data:any) => {


  try {
    const response = await axios.post(url, data, {
      headers: {
        'accept': 'application/json',
        'fcmtoken': 'null',
        'x-firebase-appcheck': 'null',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error:any) {
    console.error('Error sending data:', error);
    throw new Error('Failed to upload image.');
  }
};

export default Usepostimageupload;
