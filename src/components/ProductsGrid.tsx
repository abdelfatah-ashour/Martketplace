import productService from "@/services/productsService";
import { ProductCard } from "./ProductCard";

export default function ProductsGrid() {
  const { products, loaded, loading } = productService();

  return (
    <>
      {loaded ? (
        <div className="grid grid-cols-12 gap-6 gap-y-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-span-12 md:col-span-4 lg:col-span-3"
            >
              <ProductCard.root>
                <ProductCard.header>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="max-h-64"
                  />
                </ProductCard.header>
                <ProductCard.content>
                  <h3 className="font-semibold text-lg line-clamp-2 capitalize">
                    {product.category}
                  </h3>
                  <p className="line-clamp-2 font-normal text-sm text-gray-900">
                    {product.description}
                  </p>
                </ProductCard.content>
              </ProductCard.root>
            </div>
          ))}
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-12 gap-6 gap-y-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-4 lg:col-span-3"
            >
              <ProductCard.root>
                <ProductCard.skelton />
              </ProductCard.root>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
