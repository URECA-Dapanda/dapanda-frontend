import axios from "@/lib/axios";

export const getUserInfo = async () => {
  const { data } = await axios.get(`/api/members/info`);
  return data;
};

export const logOutRequest = async () => {
  const { data } = await axios.post(`/api/auth/logout`);
  return data;
};
