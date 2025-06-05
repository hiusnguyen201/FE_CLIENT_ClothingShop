import { Button } from "@/components/ui/button";
import { addCart, getCart, removeItem } from "@/redux/cart/cart.thunk";
import { useAppDispatch } from "@/redux/store";
import { Cart } from "@/types/cart";
import { formatPrice } from "@/utils/product";
import { showToast } from "@/utils/toast";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface CartItemsProps {
  item: Cart;
}

const CartItems: React.FC<CartItemsProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const updateQuantity = async (productVariantId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    try {
      await dispatch(addCart({ productVariantId, quantity })).unwrap();
    } catch (error) {
      if (error) showToast(false, "Failed to add to cart")
    }
  };

  const handleRemoveItem = async (productVariantId: string) => {
    try {
      await dispatch(removeItem({ productVariantId })).unwrap();
      dispatch(getCart());
    } catch (error) {
      if (error) showToast(false, "Failed to remove item")
    }
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 border-b pl-4 py-4">

      <div className="flex items-center gap-4">
        <Link to={`/product/${item.productVariant.product.slug}`}>
          <img
            src={item.productVariant.product.thumbnail}
            alt="product"
            className="w-28 h-28 object-cover rounded-md" />
        </Link>

        <div className="flex flex-col gap-2 justify-between">
          <Link to={`/product/${item.productVariant.product.slug}`}>
            <p className="font-medium line-clamp-2">{item.productVariant.product.name}</p>
          </Link>
          <p className="text-gray-500 text-sm">
            {item.productVariant.variantValues
              .map((variant) => variant.optionValue.valueName)
              .join(" / ")}
          </p>

          <Button
            variant={"ghost"}
            onClick={() => handleRemoveItem(item.productVariant._id)}
            className="w-max hover:bg-transparent text-sm p-0 justify-start">
            <TrashIcon />
            Xóa
          </Button>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">

        <div className="flex items-center border rounded-full">
          <Button
            variant={"ghost"}
            onClick={() => updateQuantity(item.productVariant._id, item.quantity - 1)}
            className="hover:bg-transparent"
          >
            <MinusIcon />
          </Button>
          <span>
            {item.quantity}
          </span>
          <Button
            variant={"ghost"}
            onClick={() => updateQuantity(item.productVariant._id, item.quantity + 1)}
            className="hover:bg-transparent"
          >
            <PlusIcon />
          </Button>
        </div>

        <p className="font-semibold">{formatPrice(item.productVariant.price)}</p>
      </div>

    </div>
  );
};

export default CartItems;
