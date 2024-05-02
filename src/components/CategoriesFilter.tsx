import categoriesService from "@/services/categoriesService";
import productService from "@/services/productsService";
import classNames from "classnames";

export default function CategoriesFilter() {
  const { categories, selectedCategory, selectCategory } = categoriesService();
  const { getProductsByCategory } = productService();

  const handleSelectCategory = (category: string) => {
    selectCategory(category);
    getProductsByCategory(category);
  };

  return (
    <div className="w-full grid grid-cols-12 items-start my-10 gap-6 lg:gap-2">
      <div className="col-span-12 lg:col-span-4">
        <h2 className="font-semibold">Shop by category</h2>
        <p className="text-sm text-gray-500">
          Discover the perfect products for your needs.
        </p>
      </div>
      <div className="col-span-12 lg:col-span-8 flex gap-3 lg:gap-6 lg:justify-end items-start">
        {categories.map((category) => (
          <button
            key={category}
            className={classNames(
              "py-2 px-3 rounded-md capitalize border border-gray-200",
              {
                "bg-black text-white":
                  selectedCategory === category ? true : false,
                "bg-white text-black":
                  selectedCategory !== category ? true : false,
              }
            )}
            type="button"
            onClick={() => handleSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
