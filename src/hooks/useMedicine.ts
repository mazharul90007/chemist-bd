"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { medicineApi, ApiResponse } from "@/lib/api-client";
import { IMedicine, IMedicineCreate } from "@/types/medicine.type";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

//===========Get Popular Medicines===========
export const usePopularMedicines = () => {
  return useQuery({
    queryKey: ["medicines", "popular"],
    queryFn: () => medicineApi.getPopularMedicines(),
  });
};

//============Get All Medicines=================
export const useAllMedicines = (
  query: Record<string, string | number | boolean | undefined | null> = {},
) => {
  return useQuery({
    queryKey: ["medicines", query],
    queryFn: () => medicineApi.getAllMedicines(query),
  });
};

//============Get Categories=================
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => medicineApi.getCategories(),
  });
};

//============Get Single Medicine=================
export const useMedicineById = (id: string) => {
  return useQuery({
    queryKey: ["medicine", id],
    queryFn: () => medicineApi.getMedicineById(id),
    enabled: !!id,
  });
};

//============Add Medicine (Mutation)=================
export const useAddMedicine = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: IMedicineCreate) => medicineApi.createMedicine(data),
    onSuccess: (data: ApiResponse<IMedicine>) => {
      toast.success(data?.message || "Medicine added successfully!");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      router.push("/dashboard/seller/medicines");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(error?.response?.data?.message || "Failed to add medicine");
    },
  });
};
//============Get Seller Medicines=================
export const useSellerMedicines = (
  query: Record<string, string | number | boolean | undefined | null> = {},
) => {
  return useQuery({
    queryKey: ["medicines", "seller", query],
    queryFn: () => medicineApi.getSellerMedicines(query),
  });
};

//============Update Medicine (Mutation)=================
export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IMedicineCreate>;
    }) => medicineApi.updateMedicine(id, data),
    onSuccess: (data: ApiResponse<IMedicine>) => {
      toast.success(data?.message || "Medicine updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update medicine",
      );
    },
  });
};

//============Delete Medicine (Mutation)=================
export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => medicineApi.deleteMedicine(id),
    onSuccess: (data: ApiResponse<null>) => {
      toast.success(data?.message || "Medicine deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete medicine",
      );
    },
  });
};
