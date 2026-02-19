import { api } from "./axiosInstance";
import { IMedicine } from "@/types/medicine.type";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

//=================Medicine Api================
export const medicineApi = {
  getPopularMedicines: async (): Promise<ApiResponse<IMedicine[]>> => {
    const response = await api.get<ApiResponse<IMedicine[]>>(
      "/medicine?popular=true",
    );
    return response.data;
  },

  getAllMedicines: async (
    params?: string,
  ): Promise<ApiResponse<IMedicine[]>> => {
    const response = await api.get<ApiResponse<IMedicine[]>>(
      `/medicine${params ? `?${params}` : ""}`,
    );
    return response.data;
  },
};
