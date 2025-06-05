import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductVariant } from "@/types/product";
import { getProduct } from "@/redux/product/product.thunk";
import { formatPrice, getPriceRange, SelectedVariant } from "@/utils/product";
import { colorMap } from "@/types/color";
import { useAddToCart } from "@/utils/product";
import { LoadingCenter } from "@/components/LoadingCenter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MinusIcon, PlusIcon } from "lucide-react";

const ProductDetail: React.FC = () => {
  const { handleAddToCart } = useAddToCart();
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    sizeId: product?.productOptions.find(opt => opt.option.name === "Size")?.optionValues[0]?.id || null,
    colorId: product?.productOptions.find(opt => opt.option.name === "Color")?.optionValues[0]?.id || null,
  });

  useEffect(() => {
    if (!id) return
    dispatch(getProduct({ id }));
  }, [id]);

  if (loading.getProduct) {
    return <LoadingCenter />;
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

  const updateQuantity = (action: "increase" | "decrease") => {
    const max = selectedVariantData?.quantity ?? 1;
    const min = 1;

    setQuantity((prev) => {
      if (action === "increase") {
        return prev < max ? prev + 1 : prev;
      }
      if (action === "decrease") {
        return prev > min ? prev - 1 : prev;
      }
      return prev;
    });
  };


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">

      <Breadcrumb className="p-0 my-4 md:mx-16 md:px-16">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${product?.category?.name}`}>{product?.category?.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <BreadcrumbLink href={`/category/${product?.subCategory?.name}`}>{product?.subCategory?.name}</BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Images */}
        <div className="flex gap-4 w-full">

          {/* <div className="flex flex-col gap-2 absolute w-15 top-5 left-5 lg:static">
            <img
              src={product.thumbnail}
              className={`w-16 h-20 rounded object-cover cursor-pointer transition-opacity duration-200"`}
            />
          </div> */}

          <div className="w-full">
            <img src={product.thumbnail} className="rounded-xl" />
          </div>

        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4 w-full">

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="text-2xl font-bold">
            {selectedVariantData ? formatPrice(selectedVariantData.price) :
              minPrice !== null && maxPrice !== null
                ? minPrice === maxPrice
                  ? `${formatPrice(minPrice)}`
                  : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                : formatPrice(0)}
          </div>

          <div className="">
            <span className="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">Freeship</span>
          </div>

          {/* Color Selection */}
          <div>
            <p className="font-medium">
              Color:
              {colorOption && selectedVariant.colorId
                ? colorOption.optionValues.find(value => value.id === selectedVariant.colorId)?.valueName
                : null
              }
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
                      className={`w-12 h-7 rounded-full cursor-pointer
                        ${selectedVariant.colorId === value.id && "ring-2 ring-offset-1"}
                        `}
                      style={{
                        backgroundColor: colorMap[value.valueName],
                      }}
                      onClick={() => isAvailable && handleSelectOption("color", value.id)}
                    />
                  );
                })
              ) : (
                null
              )}
            </div>

          </div>

          {/* Size Selection */}
          <div>
            <p className="font-medium">Size:</p>
            <div className="flex gap-2">
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
                      className={`w-20 h-18 font-semibold text-black bg-gray-300 hover:text-white
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
          <div className="relative">

            <div className="absolute flex items-center border rounded-full bg-gray-300 z-10">
              <Button
                variant={"ghost"}
                onClick={() => setQuantity(quantity - 1)}
                className="hover:bg-transparent"
              >
                <MinusIcon />
              </Button>
              <span>
                {quantity}
              </span>
              <Button
                variant={"ghost"}
                onClick={() => setQuantity(quantity + 1)}
                className="hover:bg-transparent"
              >
                <PlusIcon />
              </Button>
            </div>

            <div className="ml-1">
              <Button
                onClick={() => handleAddToCart(selectedVariantData)}
                disabled={!selectedVariantData || selectedVariantData.quantity === 0}
                className="w-full rounded-full hover:bg-gray-300 hover:text-black"
              >{!selectedVariantData ? "Add to cart" : selectedVariantData && selectedVariantData?.quantity > 0 ?
                "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </div>

        </div>
      </div>

      <div className="my-4">
        {/* Product info list */}
        <Card className="w-full">
          <h1 className="text-2xl text-center font-bold">Product description</h1>
          <CardContent className="p-6">
            {product.description}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default ProductDetail;
