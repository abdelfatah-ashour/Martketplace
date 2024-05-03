import { IProduct } from "@/@types/Product";
import Api from "@/lib/api";
import { create } from "zustand";

interface IProducts {
  products: IProduct[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
  getProductsByCategory: (category: string) => void;
}

const productService = create<IProducts>((set) => ({
  products: [],
  loading: false,
  loaded: false,
  error: null,

  async getProductsByCategory(category) {
    set(() => ({
      loading: true,
      products: [],
    }));
    const products = await new Api()
      .get<IProduct[]>(`/products/category/${category}`)
      .catch(() => {
        set(() => ({
          error: "something went wrong.",
        }));
      })
      .finally(() => {
        set(() => ({
          loading: false,
        }));
      });

    if (products) {
      set(() => ({
        products,
        loaded: true,
      }));
    }
  },
}));

export default productService;
