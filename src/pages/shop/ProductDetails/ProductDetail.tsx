import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProduct } from "@/redux/product/product.thunk";
import { formatPrice, getPriceRange, IMG_NOT_FOUND } from "@/utils/product";
import { useAddToCart } from "@/utils/product";
import { LoadingCenter } from "@/components/LoadingCenter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MinusIcon, PlusIcon } from "lucide-react";
import NotFoundPage from "@/components/NotFoundPage";
import ProductVariantsPicker from "./ProductVariantsPicker";
import { ProductVariant } from "@/types/product";
import { showToast } from "@/utils/toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { handleAddToCart } = useAddToCart();
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (!id) return;
    dispatch(getProduct({ id }));
  }, [id]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  if (loading.getProduct) {
    return <LoadingCenter className="h-96" />;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  const { minPrice, maxPrice } = getPriceRange(product.productVariants);

  const handleUpdateQuantity = (action: "increase" | "decrease") => {
    const minQuantity = 1;
    const maxQuantity = selectedVariant?.quantity ?? 1;

    setQuantity((prev) => {
      if (action === "increase") {
        if (prev < maxQuantity) {
          return prev + 1;
        } else {
          showToast(false, "Out of quantity");
          return prev;
        }
      }
      if (action === "decrease") {
        return prev > minQuantity ? prev - 1 : prev;
      }
      return prev;
    });
  };

  console.log(product);

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
              <BreadcrumbLink href={`/category/${product?.subCategory?.name}`}>
                {product?.subCategory?.name}
              </BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Images */}
        <div className="w-full">
          <div className="h-96 bg-neutral-100">
            <img src={product.thumbnail && IMG_NOT_FOUND} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="text-2xl font-bold">
            {selectedVariant
              ? formatPrice(selectedVariant.price)
              : minPrice !== null && maxPrice !== null
              ? minPrice === maxPrice
                ? `${formatPrice(minPrice)}`
                : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
              : formatPrice(0)}
          </div>

          <div>
            <span className="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full">Freeship</span>
          </div>

          <ProductVariantsPicker
            productOptions={product.productOptions}
            productVariants={product.productVariants}
            setSelectedVariant={setSelectedVariant}
          />

          {/* Add to Cart Button */}
          <div className="relative">
            <div className="absolute flex items-center border rounded-full bg-gray-300 z-10">
              <Button
                variant={"ghost"}
                onClick={() => handleUpdateQuantity("decrease")}
                className="hover:bg-transparent"
              >
                <MinusIcon />
              </Button>
              <span>{quantity}</span>
              <Button
                variant={"ghost"}
                onClick={() => handleUpdateQuantity("increase")}
                className="hover:bg-transparent"
              >
                <PlusIcon />
              </Button>
            </div>

            <div className="ml-1">
              <Button
                onClick={() => handleAddToCart(selectedVariant, quantity)}
                disabled={!selectedVariant || selectedVariant.quantity <= 0}
                className="w-full rounded-full hover:bg-gray-300 hover:text-black"
              >
                {!selectedVariant
                  ? "Add to cart"
                  : selectedVariant && selectedVariant.quantity > 0
                  ? "Add to cart"
                  : "Out of stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Card className="w-full gap-0 mt-8">
        <h1 className="text-2xl text-center font-bold">Product description</h1>
        <CardContent className="p-6">{product.description}</CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
