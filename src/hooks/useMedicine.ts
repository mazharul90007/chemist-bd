import { useQuery } from "@tanstack/react-query";
import { medicineApi } from "@/lib/api-client";

//===========Get Popular Medicines===========
export const usePopularMedicines = () => {
  return useQuery({
    queryKey: ["medicines", "popular"],
    queryFn: () => medicineApi.getPopularMedicines(),
  });
};

//============Get All Medicines=================
export const useAllMedicines = (params?: string) => {
  return useQuery({
    queryKey: ["medicines", params],
    queryFn: () => medicineApi.getAllMedicines(params),
  });
};
