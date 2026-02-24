/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, ApiResponse } from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { string } from "better-auth";
import { error } from "console";

//===========Get All Users===========
export const useUsers = (
  query: Record<string, string | number | boolean | undefined | null> = {},
) => {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => adminApi.getAllUsers(query),
  });
};

//===========Update User Status===========
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateUserStatus(id, status),
    onSuccess: (data: ApiResponse<any>) => {
      toast.success(data?.message || "User status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user status",
      );
    },
  });
};

//===========Update User Role===========
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      adminApi.updateUserRole(id, role),

    onSuccess: (data: ApiResponse<any>) => {
      toast.success(data?.message || "User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },

    onError: (error: AxiosError<ApiResponse<any>>) => {
      toast.error(
        error?.response?.data?.message || "Failed to update user role",
      );
    },
  });
};
