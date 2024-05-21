const baseUrl = `${process.env.NEXT_PUBLIC_FACESWAP_API_URL}`;
const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_PROCESSING_API_URL}`;
const videoUrl = `${process.env.NEXT_PUBLIC_VIDEO_PROCESSING_API_URL}`;
export const ENDPOINTS = {
  home: "/",
  upload:"/upload",
  result:"/examples/results",
};

export const getEndpointUrl = (endpoint: string): string => {
  return `${baseUrl}${endpoint}`;
};
export const getPhotoProcessingEndpointUrl = (endpoint: string): string => {
  return `${imageUrl}${endpoint}`;
};
export const getVideoProcessingEndpointUrl = (endpoint: string): string => {
  return `${videoUrl}${endpoint}`;
};