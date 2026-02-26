import CategoryMedicineTitle from "./CategoryMedicineTitle";
import MedicineSection from "./MedicineSection";

const CategoryMedicines = () => {
  return (
    <section className=" py-6 md:py-8 lg:py-12 bg-zinc-100 dark:bg-zinc-950">
      <div className="container mx-auto px-4 space-y-20">
        {/* ========Alopathic medicines========== */}
        <div>
          <CategoryMedicineTitle first="Alopathic" second="Medicines" />
          <MedicineSection categoryName="Alopathic" />
        </div>

        {/* =========Prescription medicine============ */}
        <div>
          <CategoryMedicineTitle first="Prescription" second="Medicines" />
          <MedicineSection categoryName="Prescription" />
        </div>
      </div>
    </section>
  );
};

export default CategoryMedicines;
