import CategoriesFilter from "@/components/CategoriesFilter";
import ProductsGrid from "@/components/ProductsGrid";
import categoriesService from "@/services/categoriesService";
import productService from "@/services/productsService";
import { useEffect } from "react";

export default function Products() {
  const { getCategories, rest } = categoriesService();
  const { getProducts } = productService();

  useEffect(() => {
    getCategories();

    return () => {
      rest();
    };
  }, [getCategories, rest]);

  useEffect(() => {
    getProducts();
    return () => {};
  }, [getProducts]);

  return (
    <>
      <CategoriesFilter />
      <ProductsGrid />
    </>
  );
}
