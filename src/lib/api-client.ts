/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./axiosInstance";
import { IMedicine, IMedicineCategory } from "@/types/medicine.type";
import { ICreateOrderPayload, IOrder } from "@/types/order.type";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

//================User Api===================
export const userApi = {
  getProfileData: async (): Promise<ApiResponse<any>> => {
    const response = await api.get<ApiResponse<any>>("/auth/me");
    return response.data;
  },
};

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

  getMedicineById: async (id: string): Promise<ApiResponse<IMedicine>> => {
    const response = await api.get<ApiResponse<IMedicine>>(`/medicine/${id}`);
    return response.data;
  },
};

//=================Cart Api================
export const cartApi = {
  addToCart: async (medicineId: string): Promise<ApiResponse<any>> => {
    const response = await api.post<ApiResponse<any>>(
      `/cart/add/${medicineId}`,
    );
    return response.data;
  },

  getMyCart: async (): Promise<ApiResponse<any>> => {
    const response = await api.get<ApiResponse<any>>("/cart");
    return response.data;
  },

  removeFromCart: async (cartItemId: string): Promise<ApiResponse<any>> => {
    const response = await api.delete<ApiResponse<any>>(
      `/cart/remove/${cartItemId}`,
    );
    return response.data;
  },

  updateQuantity: async (
    cartItemId: string,
    type: "increment" | "decrement",
  ): Promise<ApiResponse<any>> => {
    const response = await api.patch<ApiResponse<any>>(
      `/cart/update-quantity/${cartItemId}`,
      { type },
    );
    return response.data;
  },
};

//=================Order Api================
export const orderApi = {
  createOrder: async (
    data: ICreateOrderPayload,
  ): Promise<ApiResponse<IOrder>> => {
    const response = await api.post<ApiResponse<IOrder>>("/order/create", data);
    return response.data;
  },

  getMyOrders: async (): Promise<ApiResponse<IOrder[]>> => {
    const response = await api.get<ApiResponse<IOrder[]>>("/order");
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<IOrder>> => {
    const response = await api.get<ApiResponse<IOrder>>(`/order/${id}`);
    return response.data;
  },
};
