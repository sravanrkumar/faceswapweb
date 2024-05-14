import axios from "axios";
import { FsOutput } from "next/dist/server/lib/router-utils/filesystem";
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
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server response data:", error.response.data);
      console.error("Server response status:", error.response.status);
      console.error("Server response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    console.error("Error config:", error.config);
    throw error; // Rethrow the error for further handling
  }
};

export default Usepostimageupload;
