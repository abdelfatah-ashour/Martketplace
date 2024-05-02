import { ReactNode } from "react";

function ProductCardRoot({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

function ProductCardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-64 rounded-lg  flex justify-center items-center">
      {children}
    </div>
  );
}

function ProductCardContent({ children }: { children: ReactNode }) {
  return <div className="relative py-6 flex flex-col gap-2">{children}</div>;
}

function ProductCardSkelton() {
  return (
    <div className="relative py-3 flex flex-col gap-2 animate-pulse">
      <div className="w-full h-64 rounded-lg bg-gray-300"></div>
      <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-8 w-full bg-gray-300 rounded"></div>
        <div className="h-8 w-full bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export const ProductCard = {
  root: ProductCardRoot,
  header: ProductCardHeader,
  content: ProductCardContent,
  skelton: ProductCardSkelton,
};
