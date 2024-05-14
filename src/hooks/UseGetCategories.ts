import axios from "axios";

const UseGetCategories = async (url: string) => {
  try {
    const response = await axios.get(url, {
    });
  return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching the data",
      );
    } else {
      console.error(error);
      throw new Error("An error occurred while fetching the data");
    }
  }
};
export default UseGetCategories;
