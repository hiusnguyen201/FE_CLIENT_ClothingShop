import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductVariant } from "@/types/product";
import { getProduct } from "@/redux/product/product.thunk";
import { formatPrice, getPriceRange, SelectedVariant } from "@/utils/product";
import { colorMap } from "@/types/color";
import { useAddToCart } from "@/utils/product";
import { Skeleton } from "@/components/ui/skeleton";

const infoList = [
  { label: "MATERIAL", value: "92% Polyester 8% Spandex" },
  { label: "STYLE", value: "Regular\nLength 7 inches" },
  {
    label: "FIT",
    value: "Daily activities, beach travel, sports",
  },
  { label: "FEATURES", value: "Convenient side pockets" },
];

const highlights = [
  {
    title: "Fabric material",
    description: "Soft and elastic material, comfortable to wear",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg", // Thay ảnh bằng ảnh tương ứng
  },
  {
    title: "Logo",
    description: "Silicone logo material – flexible, durable, does not peel or fade over time",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg",
  },
  {
    title: "Style",
    description: "Dynamic, comfortable design, ideal for everyday activities and travel",
    image: "https://mcdn.coolmate.me//image/March2025/quan-nam-travel-short-7-inch-thumb-3.jpg",
  },
];

const ProductDetail: React.FC = () => {
  const { handleAddToCart } = useAddToCart();
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((state) => state.product);

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    sizeId: product?.productOptions.find(opt => opt.option.name === "Size")?.optionValues[0]?.id || null,
    colorId: product?.productOptions.find(opt => opt.option.name === "Color")?.optionValues[0]?.id || null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      return
    }
    dispatch(getProduct({ id }));

  }, [dispatch, id]);

  if (loading.getProduct) {
    return <Skeleton className="h-8 w-[250px]" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

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

  const { minPrice, maxPrice } = getPriceRange(product.productVariants);
  const colorOption = product.productOptions.find(opt => opt.option.name === "Color");
  const sizeOption = product.productOptions.find(opt => opt.option.name === "Size");

  const selectedVariantData = findVariant();
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:mx-10 mx-5">
        {/* Left - Images */}
        <div className="flex gap-4 relative ml-10">
          <div className="flex flex-col gap-2 absolute w-15 top-5 left-5 lg:static">
            <img
              src={product.thumbnail}
              className={`w-16 h-20 rounded object-cover cursor-pointer transition-opacity duration-200"`}
            />
          </div>
          <div className="flex-1">
            <img src={product.thumbnail} className="rounded-xl w-full max-w-[500px] aspect-[3/4] object-cover" />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4">
          <div className="space-x-2 ">
            <span className="link opacity-70">
              <Link to="/">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
            </span>
            <span className="link opacity-70">
              <Link to={`/category/${product.category.slug}`}>{product.category.name}</Link>
              <i className="ri-arrow-right-s-line"></i>
            </span>
            {product.subCategory &&
              <span className="link opacity-70">
                <Link to={`/category/${product.subCategory.slug}`}>{product.subCategory.name}</Link>
                <i className="ri-arrow-right-s-line"></i>
              </span>
            }
            <span className="link">
              <span className="text-gray-900">
                {product.name}
              </span>
            </span>
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">
              {selectedVariantData ? formatPrice(selectedVariantData.price) :
                minPrice !== null && maxPrice !== null
                  ? minPrice === maxPrice
                    ? `${formatPrice(minPrice)}`
                    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                  : formatPrice(0)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">Freeship</span>
          </div>

          {/* Color Selection */}
          <div>
            <p className="mb-2 font-medium">
              Color: <span className="font-semibold">
                {colorOption && selectedVariant.colorId
                  ? colorOption.optionValues.find(value => value.id === selectedVariant.colorId)?.valueName
                  : null}
              </span>
            </p>

            <div className="flex gap-2">
              {colorOption ? (
                colorOption.optionValues.map((value) => {
                  const isAvailable = product.productVariants.some(variant =>
                    variant.quantity > 0 &&
                    variant.variantValues.some(
                      val => val.option.name === "Color" && val.optionValue.id === value.id
                    )
                  );
                  return (
                    <Badge
                      key={value.id}
                      defaultValue={colorOption.optionValues[0].id}
                      variant={"none"}
                      className={`w-8 h-8 rounded-4xl cursor-pointer border-2
                        ${selectedVariant.colorId === value.id && "ring-2 ring-offset-2"}
                        `}
                      style={{
                        backgroundColor: colorMap[value.valueName],
                      }}
                      onClick={() => isAvailable && handleSelectOption("color", value.id)}
                    />
                  );
                })
              ) : (
                <p>No colors available</p>
              )}
            </div>

          </div>

          {/* Size Selection */}
          <div>
            <p className="mb-2 font-medium">Size: </p>
            <div className="flex flex-wrap gap-2">
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
                        ${selectedVariant.sizeId === value.id && "text-white bg-black"}
                        `}
                      onClick={() => handleSelectOption("size", value.id)}
                      disabled={!isAvailable}
                    >
                      {value.valueName}
                    </Button>
                  );
                })
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => handleAddToCart(selectedVariantData)}
            disabled={!selectedVariantData || selectedVariantData.quantity === 0}
            className="mt-6 bg-gray-900 text-white w-full py-6 text-lg rounded-xl hover:bg-gray-800"
          >{!selectedVariantData ? "Add to cart" : selectedVariantData && selectedVariantData?.quantity > 0 ?
            "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:mx-10 mx-5 gap-10 mt-10">
        {/* Product info list */}
        <Card className="w-full">
          <h1 className="lg:text-4xl md:text-3xl text-2xl text-gray-700 text-center font-bold">Product description</h1>
          <CardContent className="p-6 space-y-4 text-sm text-gray-700">
            {infoList.map((info, idx) => (
              <div key={idx} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">{info.label}</span>
                <span className="text-right whitespace-pre-line">{info.value}</span>
              </div>
            ))}
            <div className="pt-2 italic font-medium text-gray-800 text-sm">* Proudly Made In Vietnam</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {highlights.map((item, idx) => (
                <Card key={idx} className="overflow-hidden rounded-2xl border-none">
                  <div>
                    <img src={item.image} alt={item.title} className=" object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
