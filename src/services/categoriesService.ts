import Api from "@/lib/api";
import { create } from "zustand";

interface ICategories {
  categories: string[];
  selectedCategory: string | null;
  getCategories: () => void;
  selectCategory: (category: string) => void;
  rest: () => void;
}

const categoriesService = create<ICategories>((set) => ({
  categories: [],
  selectedCategory: null,
  async getCategories() {
    const categories = await new Api().get<string[]>("/products/categories");

    if (categories?.length) {
      set(() => ({
        categories,
      }));
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
