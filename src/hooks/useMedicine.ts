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
