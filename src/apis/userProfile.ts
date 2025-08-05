import axios from "@/lib/axios";

export const getUserInfo = async () => {
  const { data } = await axios.get(`/api/members/info`);
  return data;
};

export const updateMemberRole = async (): Promise<{ code: number; message: string }> => {
  try {
    const response = await axios.post("/api/members/role");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logOutRequest = async () => {
  const { data } = await axios.post(`/api/auth/logout`);
  return data;
};
