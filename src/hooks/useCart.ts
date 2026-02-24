/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi, ApiResponse } from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";

//===========Get My Cart===========
export const useMyCart = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getMyCart(),
    enabled: enabled,
  });
};

//===========Add Item to Cart===========
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (medicineId: string) => cartApi.addToCart(medicineId),
    onSuccess: (data: ApiResponse<any>) => {
      toast.success(data?.message || "Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to add item to cart",
      );
    },
  });
};

//===========Remove Item from Cart===========
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.removeFromCart(cartItemId),
    onSuccess: (data: ApiResponse<any>) => {
      toast.success(data?.message || "Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove item from cart",
      );
    },
  });
};

//===========Update Cart Quantity===========
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      type,
    }: {
      cartItemId: string;
      type: "increment" | "decrement";
    }) => cartApi.updateQuantity(cartItemId, type),
    onSuccess: (data: ApiResponse<any>) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update quantity",
      );
    },
  });
};
