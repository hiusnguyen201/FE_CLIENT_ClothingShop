import ProductCardItem from "@/pages/shop/productDetails/ProductCardItem";
import { Product } from "@/types/products";

interface ProductCardProps {
  productsData: Product[];
  className?: string;
}

const ProductCards: React.FC<ProductCardProps> = ({ productsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
      {productsData.map((product, index) => (
        <ProductCardItem key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
