import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { formatPrice, getPriceRange, IMG_NOT_FOUND } from "@/utils/product";

interface ProductCardItemProps {
  product: Product;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
  const { minPrice, maxPrice } = getPriceRange(product.productVariants);

  return (
    <div>
      <div className="bg-neutral-100 rounded-lg">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.thumbnail && IMG_NOT_FOUND}
            alt={product.name}
            className="w-full h-full object-contain mb-2 aspect-[3/4]"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2"></div>
        <Link className="line-clamp-2" to={`/shop/${product.slug}`}>
          {product.name}
        </Link>

        <div>{`${formatPrice(minPrice ?? 0)} - ${formatPrice(maxPrice ?? 0)}`}</div>
      </div>
    </div>
  );
};

export default ProductCardItem;
