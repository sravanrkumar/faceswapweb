import axios from "axios";
import { generateToken } from "./UseJWT";
const UseGetApi = async (url: string) => {
  try {
    const token = generateToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers if needed
      },
    });
  return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};
export default UseGetApi;
