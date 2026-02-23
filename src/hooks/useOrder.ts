/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi, ApiResponse } from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ICreateOrderPayload, IOrder, OrderStatus } from "@/types/order.type";

//===========Create Order===========
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateOrderPayload) => orderApi.createOrder(data),
    onSuccess: (data: ApiResponse<IOrder>) => {
      toast.success(data?.message || "Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(error?.response?.data?.message || "Failed to place order");
    },
  });
};

//===========Get My Orders===========
export const useMyOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.getMyOrders(),
  });
};

//===========Get All Orders (Admin)===========
export const useAllOrders = (
  query: Record<string, string | number | boolean | undefined | null> = {},
) => {
  return useQuery({
    queryKey: ["all-orders", query],
    queryFn: () => orderApi.getAllOrders(query),
  });
};

//===========Get Order Details===========
export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  });
};
//===========Get Seller Orders===========
export const useSellerOrders = () => {
  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: () => orderApi.getSellerOrders(),
  });
};

//===========Update Order Status===========
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      orderApi.updateOrderStatus(id, status),
    onSuccess: (data: ApiResponse<IOrder>) => {
      toast.success(data?.message || "Order status updated!");
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
    },
  });
};
