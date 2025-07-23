import axios from "@lib/axios";

export async function registReport(target: string, reason: string, targetCategory: string) {
  const response = await axios.post(`/api/report/${target}`, {
    reason,
    targetCategory,
  });

  return response.data;
}
