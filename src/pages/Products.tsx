import CategoriesFilter from "@/components/CategoriesFilter";
import ProductsGrid from "@/components/ProductsGrid";
import categoriesService from "@/services/categoriesService";
import { useEffect } from "react";

export default function Products() {
  const { getCategories, rest } = categoriesService();

  useEffect(() => {
    getCategories();

    return () => {
      rest();
    };
  }, [getCategories, rest]);

  return (
    <>
      <CategoriesFilter />
      <ProductsGrid />
    </>
  );
}
