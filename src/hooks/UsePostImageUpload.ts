import axios from "axios";

const Usepostimageupload = async (url:string, data:any) => {
  try {
    console.log("Uploading image...");
    const response = await axios.post(url, data, {
      headers: {'Access-Control-Allow-Origin': 'https://faceswapweb.onrender.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'accept': 'application/json',
      'fcmtoken': 'null',
      'x-firebase-appcheck': 'null',
      'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Image uploaded successfully:", response);
    return response;
  } catch (error) {
    console.error('Error sending data:', error);
    throw new Error('Failed to upload image.');
  }
};

export default Usepostimageupload;
