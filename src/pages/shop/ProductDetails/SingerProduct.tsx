import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingStarts from "@/components/RatingStars";
import { ColorBadge } from "@/components/productSlice/ColorBadge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProduct } from "@/redux/product/product.thunk";
import { Nullable } from "@/types/common";
import { ProductVariant } from "@/types/product";
import { colorMap } from "@/types/color";
import { formatPrice } from "@/utils/product";
import { addCart, getCart } from "@/redux/cart/cart.thunk";
import { toast } from "@/hooks/use-toast";

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

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(
    state => state.product
  );

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
      dispatch(addCart({ productVariantId: selectedVariantData.id, quantity: 1 })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast({ title: "Added to cart successfully" })
          dispatch(getCart())
        } else {
          toast({
            title: res.payload?.toString() || "Failed to add to cart",
            variant: "destructive"
          })
        }
      })
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(
        getProduct(id)
      );
    }
  }, [dispatch, id]);

  if (loading.getProduct) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { minPrice, maxPrice } = getPriceRange(product.productVariants);

  const colorOption = product.productOptions.find(opt => opt.option.name === "Color");
  const sizeOption = product.productOptions.find(opt => opt.option.name === "Size");
  const selectedVariantData = findVariant();

  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="link opacity-80">
            <Link to="/">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="link opacity-80">
            <Link to="/shop">Shop</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="link opacity-80">
            <span >{product.name}</span>
          </span>
        </div>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              className="rounded-md h-auto"
              src={product.thumbnail}
              alt={product.slug}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-3xl font-semibold mb-4">{product.name}</h3>
            <div className="flex gap-1 items-center">
              <strong className="mb-1">Rating: </strong>
              <RatingStarts rating={4} />
            </div>
            <s className="opacity-70 text-sm text-gray-600 ">299.000đ</s>
            <div className="flex space-x-2">
              <p className="text-2xl text-red-500 mb-4">
                {selectedVariantData ? formatPrice(selectedVariantData.price) :
                  minPrice !== null && maxPrice !== null
                    ? minPrice === maxPrice
                      ? `${formatPrice(minPrice)}`
                      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                    : formatPrice(0)}
              </p>
              <p className="text-white p-1 bg-red-500 rounded-xl font-bold text-sm h-7">-13%</p>
            </div>
            <p className="text-gray-500 mb-4 text-lg">Voucher: Discount 20k</p>

            {/* additional product info */}
            <div>
              <p className="text-stone-600 text-md">Color:
                {colorOption && selectedVariant.colorId
                  ? colorOption.optionValues.find(value => value.id === selectedVariant.colorId)?.valueName
                  : null}
              </p>
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
                  <p>No colors available</p>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-stone-600 text-md">Size:</p>
                <Link to={""} className="text-blue-500 text__underline">
                  Instructions for choosing size
                </Link>
              </div>

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
                        ${selectedVariant.sizeId === value.id ? "bg-red-500" : null}`}
                      >
                        {value.valueName}
                      </Button>
                    );
                  })
                ) : (
                  <p>No sizes available</p>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariantData || selectedVariantData.quantity === 0}
                className="mt-6 px-5 py-3 bg-red-500 text-white rounded-md cursor-pointer"
              >{!selectedVariantData ? "Add to cart" : selectedVariantData && selectedVariantData?.quantity > 0 ?
                "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* display review */}
      <section className="section__container mt-6">{product.description}</section>
    </div>
  );
};

export default SingleProduct;
