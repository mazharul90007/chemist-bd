import CategoryMedicineTitle from "./CategoryMedicineTitle";
import MedicineSection from "./MedicineSection";

const CategoryMedicines = () => {
  return (
    <section className=" py-6 md:py-8 lg:py-12 bg-zinc-100 dark:bg-zinc-950">
      <div className="container mx-auto px-4 space-y-8">
        {/* =========Prescription medicine============ */}
        <div>
          <CategoryMedicineTitle first="Prescription" second="Medicines" />
          <MedicineSection categoryName="Prescription" />
        </div>

        {/* =========Baby Care Products============ */}
        <div>
          <CategoryMedicineTitle first="Baby care" second="Products" />
          <MedicineSection categoryName="Baby Care" />
        </div>

        {/* ========Alopathic medicines========== */}
        <div>
          <CategoryMedicineTitle first="Alopathic" second="Medicines" />
          <MedicineSection categoryName="Alopathic" />
        </div>
      </div>
    </section>
  );
};

export default CategoryMedicines;
