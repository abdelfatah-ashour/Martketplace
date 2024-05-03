import Api from "@/lib/api";
import { create } from "zustand";
import productService from "./productsService";

export interface ICategories {
  categories: string[];
  selectedCategory: string | null;
  getCategories: () => void;
  selectCategory: (category: string) => void;
  rest: () => void;
}

const categoriesService = create<ICategories>((set, get) => ({
  categories: [],
  selectedCategory: null,
  async getCategories() {
    const categories = await new Api().get<string[]>("/products/categories");
    const { getProductsByCategory } = productService.getInitialState();
    const selectedCategory = get().selectedCategory;
    const selectCategory = get().selectCategory;

    if (categories?.length) {
      set(() => ({
        categories,
      }));

      if (!selectedCategory) {
        selectCategory(categories[0]);
        getProductsByCategory(categories[0]);
      }
    }
  },
  selectCategory(category) {
    set(() => ({
      selectedCategory: category,
    }));
  },
  rest() {
    set(() => ({
      ...categoriesService.getInitialState(),
    }));
  },
}));

export default categoriesService;
