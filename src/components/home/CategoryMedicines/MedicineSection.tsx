"use client";

import { useAllMedicines, useCategories } from "@/hooks/useMedicine";
import { Loader2 } from "lucide-react";
import MedicineCard from "../MedicineCard";
import LinkableButton from "@/app/shared/LinkableButton";

const MedicineSection = ({ categoryName }: { categoryName: string }) => {
  //fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const category = categoriesData?.data?.find(
    (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase(),
  );

  //Fetch Medicines for specific category
  const { data: medicinesData, isLoading: isMedicinesLoading } =
    useAllMedicines({
      categoryId: category?.id,
      limit: 6,
    });

  const medicines = medicinesData?.data || [];

  //Loading State
  if (isCategoriesLoading || (category && isMedicinesLoading)) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid of 4 Medicines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {medicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            id={medicine.id}
            name={medicine.name}
            price={medicine.price}
            category={medicine.category?.categoryName}
            photoUrl={medicine.photoUrl}
            discount={medicine.discount}
            company={medicine.company}
            strength={medicine.strength}
          />
        ))}
      </div>
      {/* View All Button */}
      <div className="flex justify-end mt-6">
        <LinkableButton
          title={`View All ${categoryName} Medicines`}
          link={`medicines?categoryId=${category?.id}`}
        />
      </div>
    </div>
  );
};

export default MedicineSection;
