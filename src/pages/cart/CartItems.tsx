import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addCart, clearCart, getCart, removeItem } from "@/redux/cart/cart.thunk";
import { useAppDispatch } from "@/redux/store";
import { Cart } from "@/types/cart";
import { formatPrice } from "@/utils/product";
import React, { useEffect, useState } from "react";

interface CartItemsProps {
  cartData: Cart[];
}

const CartItems: React.FC<CartItemsProps> = ({ cartData }) => {
  const dispatch = useAppDispatch();
  // const colorProduct = ["White", "Black", "Green"];
  // const sizeProduct = ["S", "M", "L", "Xl", "2Xl"];


  //toggle select all item
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const isAllSelected = selectedItems.length === cartData.length;

  // const handleToggleAll = () => {
  //   if (isAllSelected) {
  //     setSelectedItems([]);
  //   } else {
  // setSelectedItems(cartData.map((item) => item.id));
  // }
  // };

  const updateQuantity = (productVariantId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    dispatch(addCart({ productVariantId, quantity })).then((res) => {
      if (res.meta.requestStatus !== "fulfilled") {
        toast({
          title: res.payload?.toString() || "Failed to add to cart",
          variant: "destructive"
        })
      } else {
        dispatch(getCart());
      }
    });
  };

  const handleRemoveItem = (productVariantId: string) => {
    dispatch(removeItem({ productVariantId })).then((res) => {
      if (res.meta.requestStatus !== "fulfilled") {
        toast({
          title: res.payload?.toString() || "Failed to remove item",
          variant: "destructive"
        })
      } else {
        dispatch(getCart());
      }
    });
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // const handleToggleItem = (id: string) => {
  //   setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  // };

  // //dropdown menu color
  // const [openDropdownColorIndex, setOpenDropdownColorIndex] = useState<number | null>(null);
  // const [selectedColor, setSelectedColor] = useState<{ [key: number]: string }>({});

  // const handleOpenDropdownColor = (index: number) => {
  //   setOpenDropdownSizeIndex(null);
  //   setOpenDropdownColorIndex(openDropdownColorIndex === index ? null : index);
  // };

  // const handleSelectColor = (color: string, index: number) => {
  //   setSelectedColor((prev) => ({ ...prev, [index]: color }));
  //   setOpenDropdownColorIndex(null);
  // };

  //dropdown menu size
  // const [openDropdownSizeIndex, setOpenDropdownSizeIndex] = useState<number | null>(null);
  // const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({});

  // const handleOpenDropdownSize = (index: number) => {
  //   setOpenDropdownColorIndex(null);
  //   setOpenDropdownSizeIndex(openDropdownSizeIndex === index ? null : index);
  // };

  // const handleSelectSize = (size: string, index: number) => {
  //   setSelectedSize((prev) => ({ ...prev, [index]: size }));
  //   setOpenDropdownSizeIndex(null);
  // };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <div className="flex justify-between items-center border-b border-gray-200 my-5">
        <div className="flex items-center space-x-2">
          {/* <input type="checkbox" className="" checked={isAllSelected} onChange={handleToggleAll} /> */}
          <Button
            onClick={() => dispatch(clearCart())}
            className="shadow-none text-sm md:text-base"
          >Clear all item</Button>
        </div>
        <div className="text-gray-600 text-sm md:text-base">
          {/* <span>Quantity</span> */}
          <span className="ml-3 mr-4">Price</span>
        </div>
      </div>

      {cartData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 py-6 gap-4"
        >
          {/* Left: Image + Info */}
          <div className="flex items-center gap-4 w-full lg:w-3/4">
            {/* <input
              type="checkbox"
              className=" mt-2 accent-primary"
            checked={selectedItems.includes(item._id)}
            onChange={() => handleToggleItem(item._id)}
            /> */}
            <div className="w-28 sm:w-32 md:w-36">
              <img src={item.productVariant.product.thumbnail} alt="product" className="w-full aspect-[3/4] object-cover rounded-md" />
            </div>

            <div className="flex flex-col w-full gap-2">
              <h4 className="font-medium text-sm md:text-base lg:text-lg">{item.productVariant.product.name}</h4>
              <p className="text-gray-500 text-sm">
                {item.productVariant.variantValues
                  .map((variant) => variant.optionValue.valueName)
                  .join(" / ")}
              </p>

              {/* Dropdowns */}
              <div className="flex flex-wrap items-center gap-2 relative">
                {/* Color Dropdown */}
                {/* <div
                  onClick={() => handleOpenDropdownColor(index)}
                  className="flex items-center justify-between h-8 w-24 px-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <span>{selectedColor[index] || "White"}</span>
                  <i
                    className={`ri-arrow-down-s-line transition-transform duration-300 ${openDropdownColorIndex === index ? "rotate-180" : ""
                      }`}
                  ></i>
                </div> */}
                {/* {openDropdownColorIndex === index && (
                  <div className="absolute z-10 top-10 w-24 rounded-2xl bg-white shadow-xl transition-all duration-300">
                    <ul className="py-2 text-sm">
                      {colorProduct.map((option, colorIdx) => (
                        <li
                          key={colorIdx}
                          onClick={() => handleSelectColor(option, index)}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedColor[index] === option ? "bg-gray-100" : ""
                            }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {/* Size Dropdown */}
                {/* <div
                  onClick={() => handleOpenDropdownSize(index)}
                  className="flex items-center justify-between h-8 w-24 px-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <span>{selectedSize[index] || "L"}</span>
                  <i
                    className={`ri-arrow-down-s-line transition-transform duration-300 ${openDropdownSizeIndex === index ? "rotate-180" : ""
                      }`}
                  ></i>
                </div>
                {openDropdownSizeIndex === index && (
                  <div className="absolute z-10 top-10 left-24 w-24 rounded-2xl bg-white shadow-xl transition-all duration-300">
                    <ul className="py-2 text-sm">
                      {sizeProduct.map((option, sizeIdx) => (
                        <li
                          key={sizeIdx}
                          onClick={() => handleSelectSize(option, index)}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedSize[index] === option ? "bg-gray-100" : ""
                            }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {/* Quantity */}
                <div className="flex items-center border rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.productVariant._id, item.quantity - 1)}
                    className="px-2 text-lg">-
                  </button>
                  <span className="px-2">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productVariant._id, item.quantity + 1)}
                    className="px-2 text-lg">
                    +</button>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.productVariant._id)}
                className="flex items-center text-red-500 text-sm hover:underline mt-2">
                <i className="ri-delete-bin-line mr-1" />
                Xóa
              </button>
            </div>
          </div>

          {/* Right: Price */}
          <div className="flex flex-col items-end w-full lg:w-1/4 gap-1 pr-2">
            <p className="font-semibold text-lg">{formatPrice(item.productVariant.price)}</p>
            <p className="line-through text-sm text-gray-400">349.000đ</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
