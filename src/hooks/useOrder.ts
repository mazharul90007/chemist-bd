/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi, ApiResponse } from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ICreateOrderPayload, IOrder } from "@/types/order.type";

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

//===========Get Order Details===========
export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  });
};
