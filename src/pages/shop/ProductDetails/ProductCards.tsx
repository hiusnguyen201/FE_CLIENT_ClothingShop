import ProductCardItem from "@/pages/shop/ProductDetails/ProductCardItem";
import { Product } from "@/types/product";

interface ProductCardProps {
  productsData: Product[];
}

const ProductCards: React.FC<ProductCardProps> = ({ productsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productsData.map((product) => (
        <ProductCardItem
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductCards;
