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

  const [isHovered, setIsHovered] = useState(false);

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
    <div>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.thumbnail}
            alt={product.name}
            className="object-cover rounded-lg mb-2 aspect-[3/4]"
          />
        </Link>

        {isHovered && (
          <div
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), hsla(0, 0%, 100%, .4)",
            }}
            className="absolute p-4 bottom-6 left-6 right-6 rounded-lg backdrop-blur-sm"
          >
            <div className="flex justify-center mb-2">
              <Button
                onClick={() => handleAddToCart(selectedVariantData)}
                disabled={!selectedVariantData || selectedVariantData.quantity < 1}
              >
                {!selectedVariantData
                  ? "Add to cart"
                  : selectedVariantData.quantity > 0
                    ? "Add to cart"
                    : "Out of stock"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-1">
              {sizeOption &&
                sizeOption.optionValues.map((value) => {
                  const isAvailable = product.productVariants.some(
                    (variant) =>
                      variant.variantValues.some(
                        (val) =>
                          val.option.name === "Size" &&
                          val.optionValue.id === value.id
                      ) && variant.quantity > 0
                  );
                  return (
                    <Button
                      key={value.id}
                      className={`w-[48px] h-[44px] ${selectedVariant.sizeId === value.id &&
                        "bg-gray"
                        }`}
                      onClick={() => handleSelectOption("size", value.id)}
                      disabled={!isAvailable}
                    >
                      {value.valueName}
                    </Button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">

        <div className="flex flex-wrap gap-2">
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

        <Link
          className="line-clamp-2"
          to={`/shop/${product.slug}`}
        >
          {product.name}
        </Link>

        <div>
          {
            selectedVariantData ? formatPrice(selectedVariantData.price) :
              minPrice !== null && maxPrice !== null
                ? minPrice === maxPrice
                  ? `${formatPrice(minPrice)}`
                  : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                : null
          }
        </div>

      </div>
    </div >
  );
};

export default ProductCardItem;
