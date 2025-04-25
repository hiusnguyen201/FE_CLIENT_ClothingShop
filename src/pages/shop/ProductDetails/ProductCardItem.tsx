import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { ColorBadge } from "@/components/productSlice/ColorBadge";
import { Button } from "@/components/ui/button";
import { Product, ProductVariant } from "@/types/product";
import { useState } from "react";
import { colorMap } from "@/types/color";
import { formatPrice, getPriceRange, SelectedVariant, useAddToCart } from "@/utils/product";

interface ProductCardItemProps {
  product: Product;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product }) => {
  const { handleAddToCart } = useAddToCart();

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

  const colorOption = product.productOptions.find(opt => opt.option.name === "Color");
  const sizeOption = product.productOptions.find(opt => opt.option.name === "Size");
  const selectedVariantData = findVariant();
  const { minPrice, maxPrice } = getPriceRange(product.productVariants);

  return (
    <div className="product__card">
      <motion.div className="relative" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
        <Link className="relative block" to={`/product/${product.slug}`}>
          <img src={product.thumbnail} alt="" className="object-cover rounded-lg h-full mb-2 w-full aspect-[3/4]" />
        </Link>
        <motion.div
          animate={controls}
          initial={{ y: 12, opacity: 0 }}
          style={{
            background: "linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), hsla(0, 0%, 100%, .4)",
          }}
          className="absolute p-3 mx-auto md:h-auto backdrop-blur-sm bottom-6 left-6 right-6 rounded md:block hidden"
        >
          <div className="flex justify-center my-4">
            <Button
              onClick={() => handleAddToCart(selectedVariantData)}
              disabled={!selectedVariantData || selectedVariantData.quantity < 1}
              className="text-white rounded-md cursor-pointer"
            >{!selectedVariantData ? "Add to cart" : selectedVariantData && selectedVariantData?.quantity > 0 ?
              "Add to cart" : "Out of stock"}
            </Button>
          </div>


          <div className="flex flex-wrap gap-1">
            {sizeOption && (
              sizeOption.optionValues.map((value) => {
                const isAvailable = product.productVariants.some(variant =>
                  variant.variantValues.some(
                    val => val.option.name === "Size" && val.optionValue.id === value.id
                  ) && variant.quantity > 0
                );
                return (
                  <Button
                    key={value.id}
                    // variant={selectedVariant.sizeId === value.id ? "outline" : null}
                    className={`w-[48px] h-[44px] font-semibold text-black bg-gray-300 hover:text-white
                    ${selectedVariant.sizeId === value.id && "text-white bg-black"}`}
                    onClick={() => handleSelectOption("size", value.id)}
                    disabled={!isAvailable}
                  >
                    {value.valueName}
                  </Button>
                );
              })
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col min-h-[94px]">
        <div className="flex mb-2 items-center gap-1 sm:gap-2 flex-wrap mt-2">
          {colorOption && (
            colorOption.optionValues.map((value) => {
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
          )}
        </div>
        <Link to={`/shop/${product.slug}`}>
          <h4 className="line-clamp-2 mb-1">{product.name}</h4>
        </Link>
        <div className="flex items-center gap-2">
          {
            selectedVariantData ? formatPrice(selectedVariantData.price) :
              minPrice !== null && maxPrice !== null
                ? minPrice === maxPrice
                  ? `${formatPrice(minPrice)}`
                  : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                : formatPrice(0)
          }
        </div >
      </div >
    </div >
  );
};

export default ProductCardItem;
