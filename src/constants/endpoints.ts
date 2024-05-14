const baseUrl = `${process.env.NEXT_PUBLIC_XDS_API_URL}`;

export const ENDPOINTS = {
  adminlogin: "/auth/signin",
  adminRegister: "/auth/signup",
  category: "/category",
  deleteTag: (tagId: string) => `/category-tag/${tagId}/`,
};

export const getEndpointUrl = (endpoint: string): string => {
  return `${baseUrl}${endpoint}`;
};