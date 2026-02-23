/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./axiosInstance";
import { IMedicine, IMedicineCategory, IMedicineCreate } from "@/types/medicine.type";
import { ICreateOrderPayload, IOrder, OrderStatus } from "@/types/order.type";

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
    const response = await api.get<ApiResponse<IMedicineCategory[]>>("/category");
    return response.data;
  },

  getMedicineById: async (id: string): Promise<ApiResponse<IMedicine>> => {
    const response = await api.get<ApiResponse<IMedicine>>(`/medicine/${id}`);
    return response.data;
  },

  createMedicine: async (
    data: IMedicineCreate,
  ): Promise<ApiResponse<IMedicine>> => {
    const response = await api.post<ApiResponse<IMedicine>>("/medicine", data);
    return response.data;
  },

  getSellerMedicines: async (
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<IMedicine[]>> => {
    const response = await api.get<ApiResponse<IMedicine[]>>(
      "/medicine/seller-medicines",
      {
        params: query,
      },
    );
    return response.data;
  },

  updateMedicine: async (
    id: string,
    data: Partial<IMedicineCreate>,
  ): Promise<ApiResponse<IMedicine>> => {
    const response = await api.patch<ApiResponse<IMedicine>>(
      `/medicine/${id}`,
      data,
    );
    return response.data;
  },

  deleteMedicine: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/medicine/${id}`);
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

  getAllOrders: async (
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<IOrder[]>> => {
    const response = await api.get<ApiResponse<IOrder[]>>("/order/all", {
      params: query,
    });
    return response.data;
  },

  getMyOrders: async (
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<IOrder[]>> => {
    const response = await api.get<ApiResponse<IOrder[]>>("/order", {
      params: query,
    });
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<IOrder>> => {
    const response = await api.get<ApiResponse<IOrder>>(`/order/${id}`);
    return response.data;
  },

  getSellerOrders: async (
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<IOrder[]>> => {
    const response = await api.get<ApiResponse<IOrder[]>>(
      "/order/seller-orders",
      {
        params: query,
      },
    );
    return response.data;
  },

  updateOrderStatus: async (
    id: string,
    status: OrderStatus,
  ): Promise<ApiResponse<IOrder>> => {
    const response = await api.patch<ApiResponse<IOrder>>(`/order/${id}`, {
      status,
    });
    return response.data;
  },
};

//=================Category Api================
export const categoryApi = {
  createCategory: async (data: {
    categoryName: string;
    categoryDetails?: string;
    categoryStatus?: string;
  }): Promise<ApiResponse<IMedicineCategory>> => {
    const response = await api.post<ApiResponse<IMedicineCategory>>(
      "/category",
      data,
    );
    return response.data;
  },

  getAllCategories: async (): Promise<ApiResponse<IMedicineCategory[]>> => {
    const response =
      await api.get<ApiResponse<IMedicineCategory[]>>("/category");
    return response.data;
  },
};

//=================Admin Api================
export const adminApi = {
  getAllUsers: async (
    query: Record<string, string | number | boolean | undefined | null> = {},
  ): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>("/admin/users", {
      params: query,
    });
    return response.data;
  },

  updateUserStatus: async (
    id: string,
    status: string,
  ): Promise<ApiResponse<any>> => {
    const response = await api.patch<ApiResponse<any>>(`/admin/users/${id}`, {
      status,
    });
    return response.data;
  },
};
