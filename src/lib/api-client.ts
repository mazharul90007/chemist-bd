import { api } from "./axiosInstance";
import { IMedicine, IMedicineCategory } from "@/types/medicine.type";

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
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<IMedicine[]>> => {
    const response = await api.get<ApiResponse<IMedicine[]>>("/medicine", {
      params: query,
    });
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<IMedicineCategory[]>> => {
    const response =
      await api.get<ApiResponse<IMedicineCategory[]>>("/category");
    return response.data;
  },
};
