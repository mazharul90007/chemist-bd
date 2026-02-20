import { userApi } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

//===============Get Profile Data=============
export const useProfileData = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfileData(),
  });
};
