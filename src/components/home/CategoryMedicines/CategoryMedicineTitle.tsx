const CategoryMedicineTitle = ({
  first,
  second,
}: {
  first: string;
  second: string;
}) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        {first} <span className="text-emerald-600">{second}</span>
      </h2>
    </div>
  );
};

export default CategoryMedicineTitle;
