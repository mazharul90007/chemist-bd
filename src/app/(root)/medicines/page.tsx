import React from "react";
import { medicineApi } from "@/lib/api-client";
import MedicinesClientPage from "./MedicinesClientPage";

// This makes the page a Server Component
export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;

  // Convert searchParams to the format expected by the API
  const query = {
    searchTerm: params.searchTerm || undefined,
    categoryId: params.categoryId || undefined,
    minPrice: params.minPrice || undefined,
    maxPrice: params.maxPrice || undefined,
    popular: params.popular || undefined,
    page: params.page || "1",
    limit: "10",
  };

  // Use native fetch for server-side requests to avoid axios/url.parse warnings
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000/api/v1";
  
  const getMedicines = async () => {
    try {
      const queryString = new URLSearchParams(
        Object.entries(query).filter(([_, v]) => v !== undefined) as [string, string][]
      ).toString();
      
      const res = await fetch(`${apiUrl}/medicine?${queryString}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching medicines on server:", error);
      return {
        success: false,
        message: "Failed to load medicines",
        data: [],
        meta: { page: 1, limit: 10, total: 0 },
      };
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/category`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching categories on server:", error);
      return {
        success: false,
        message: "Failed to load categories",
        data: [],
      };
    }
  };

  const [initialMedicines, initialCategories] = await Promise.all([
    getMedicines(),
    getCategories(),
  ]);

  return (
    <MedicinesClientPage
      initialMedicines={initialMedicines}
      initialCategories={initialCategories}
    />
  );
}
