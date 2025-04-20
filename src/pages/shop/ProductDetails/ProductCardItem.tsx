import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductBadge } from "@/components/productSlice/ProductBadge";
import { ColorBadge } from "@/components/productSlice/ColorBadge";
import { Button } from "@/components/ui/button";
import { Product, ProductVariant } from "@/types/product";
import { useState } from "react";
import { Nullable } from "@/types/common";
import { colorMap } from "@/types/color";

interface ProductCardItemProps {
  product: Product;
}

interface SelectedVariant {
  sizeId: Nullable<string>;
  colorId: Nullable<string>;
}

interface PriceRange {
  minPrice: Nullable<number>;
  maxPrice: Nullable<number>;
}

const getPriceRange = (variants: ProductVariant[]): PriceRange => {
  if (variants.length === 0) {
    return { minPrice: null, maxPrice: null };
  }
  const prices = variants.map(variant => variant.price);
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};
const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      y: 12,
      opacity: 0,
      transition: { duration: 0.3 },
    });
  };

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    sizeId: null,
    colorId: null,
  });

  const findVariant = (): ProductVariant | null => {
    if (!product || !selectedVariant.sizeId || !selectedVariant.colorId) {
      return null;
    }
    return (
      product.productVariants.find(variant =>
        variant.variantValues.some(
          val => val.option.name === "Size" && val.optionValue.id === selectedVariant.sizeId
        ) &&
        variant.variantValues.some(
          val => val.option.name === "Color" && val.optionValue.id === selectedVariant.colorId
        )
      ) || null
    );
  };

  const handleSelectOption = (type: "size" | "color", valueId: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [type === "size" ? "sizeId" : "colorId"]: valueId,
    }));
  };

  const handleAddToCart = () => {
    if (selectedVariantData && selectedVariantData.quantity > 0) {
      console.log(selectedVariantData);
    }
  };

  const { minPrice, maxPrice } = getPriceRange(product.productVariants);

  const colorOption = product.productOptions.find(opt => opt.option.name === "Color");
  const sizeOption = product.productOptions.find(opt => opt.option.name === "Size");
  const selectedVariantData = findVariant();

  return (
    <div className="product__card">
      <motion.div className="relative" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
        <div className="absolute z-10 right-2 left-2 top-2 flex items-center justify-end flex-wrap gap-1">
          {/* {product.discount && <ProductBadge title={product.discount} className="md:hidden flex" />}
          {product.isNew && <ProductBadge title="NEW" />} */}
        </div>
        <Link className="relative block" to={`/shop/${product.slug}`}>
          <img src={product.thumbnail} alt="" className="object-cover rounded-lg h-full mb-2 w-full aspect-[3/4]" />
        </Link>
        <motion.div
          animate={controls}
          initial={{ y: 12, opacity: 0 }}
          style={{
            background: "linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), hsla(0, 0%, 100%, .4)",
          }}
          className="absolute p-3 mx-auto h-auto backdrop-blur-sm bottom-6 left-6 right-6 rounded md:block hidden"
        >
          <Button
            onClick={handleAddToCart}
            disabled={!selectedVariantData || selectedVariantData.quantity === 0}
            className="mt-6 px-5 py-3 bg-red-500 text-white rounded-md cursor-pointer"
          >{!selectedVariantData ? "Add to cart" : selectedVariantData && selectedVariantData?.quantity > 0 ?
            "Add to cart" : "Out of stock"}
          </Button>
          <div className="flex flex-wrap gap-1">
            {sizeOption ? (
              sizeOption.optionValues.map((value, i) => {
                const isAvailable = product.productVariants.some(variant =>
                  variant.variantValues.some(
                    val => val.option.name === "Size" && val.optionValue.id === value.id
                  ) && variant.quantity > 0
                );
                return (
                  <Button
                    key={value.id}
                    onClick={() => handleSelectOption("size", value.id)}
                    disabled={!isAvailable}
                    className={`bg-gray-300 mt-2 hover:bg-gray-400 w-[40px] h-[38px] cursor-pointer
                                    ${selectedVariant.sizeId === value.id ? "bg-red-300" : null}`}
                  >
                    {value.valueName}
                  </Button>
                );
              })
            ) : (
              null
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col min-h-[94px]">
        <div className="flex mb-2 items-center gap-1 sm:gap-2 flex-wrap mt-2">
          {colorOption ? (
            colorOption.optionValues.map((value, i) => {
              const isAvailable = product.productVariants.some(variant =>
                variant.quantity > 0 &&
                variant.variantValues.some(
                  val => val.option.name === "Color" && val.optionValue.id === value.id
                )
              );
              return (
                <ColorBadge
                  key={value.id}
                  color={colorMap[value.valueName]}
                  active={selectedVariant.colorId === value.id}
                  disabled={!isAvailable}
                  onClick={() => isAvailable && handleSelectOption("color", value.id)}
                />
              );
            })
          ) : (
            null
          )}
        </div>
        <Link to="#">
          <h4 className="line-clamp-2 mb-1">{product.name}</h4>
        </Link>
        <div className="flex items-center gap-2">
          {/* <span className="font-bold text-md">{product.price.toLocaleString()}đ</span> */}
          {selectedVariantData ? formatPrice(selectedVariantData.price) :
            minPrice !== null && maxPrice !== null
              ? minPrice === maxPrice
                ? `${formatPrice(minPrice)}`
                : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
              : formatPrice(0)}
          {/* {product.discount && (
            <p className="text-white p-1 bg-red-500 md:flex hidden rounded-xl font-bold text-sm">-{product.discount}</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardItem;
