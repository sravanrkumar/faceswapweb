import axios from "axios";

const UseGetApi = async (url: string) => {
  try {
    const response = await axios.get(url, {
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
