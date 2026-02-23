/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryApi, ApiResponse } from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IMedicineCategory } from "@/types/medicine.type";

//===========Get All Categories===========
export const useAllCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => categoryApi.getAllCategories(),
  });
};

//===========Create Category===========
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      categoryName: string;
      description?: string;
      image?: string;
    }) => categoryApi.createCategory(data),
    onSuccess: (data: ApiResponse<IMedicineCategory>) => {
      toast.success(data?.message || "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category",
      );
    },
  });
};
