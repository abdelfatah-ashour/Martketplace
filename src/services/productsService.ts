import { IProduct } from "@/@types/Product";
import Api from "@/lib/api";
import { create } from "zustand";

interface IProducts {
  products: IProduct[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
  cache: Map<string, IProduct[]>;
  getProductsByCategory: (category: string) => void;
}

setInterval(() => {
  productService.setState({
    cache: new Map(),
  });
}, 5000);

const productService = create<IProducts>((set, get) => ({
  products: [],
  loading: false,
  loaded: false,
  error: null,
  cache: new Map(),

  async getProductsByCategory(category) {
    if (get().cache.has(category)) {
      set(() => ({
        products: get().cache.get(category),
      }));
    } else {
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
        get().cache.set(category, products),
          set(() => ({
            products,
            loaded: true,
          }));
      }
    }
  },
}));

export default productService;
