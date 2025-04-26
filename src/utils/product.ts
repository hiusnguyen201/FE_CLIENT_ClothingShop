import { addCart, getCart } from "@/redux/cart/cart.thunk";
import { useAppDispatch } from "@/redux/store";
import { Cart } from "@/types/cart";
import { Nullable } from "@/types/common";
import { ProductVariant } from "@/types/product";
import { showToast } from "./toast";

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

export const calculateTotalPrice = (cartItems: Cart[]): number => {
    return cartItems.reduce((total: number, item: Cart) => {
        const itemPrice = item.productVariant.price * item.quantity;
        return total + itemPrice;
    }, 0);
}

interface PriceRange {
    minPrice: Nullable<number>;
    maxPrice: Nullable<number>;
}

export interface SelectedVariant {
    sizeId: Nullable<string>;
    colorId: Nullable<string>;
}

export const getPriceRange = (variants: ProductVariant[]): PriceRange => {
    if (variants.length === 0) {
        return { minPrice: null, maxPrice: null };
    }
    const prices = variants.map(variant => variant.price);
    return {
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
    };
};

export const useAddToCart = () => {
    const dispatch = useAppDispatch();

    const handleAddToCart = async (selectedVariantData: ProductVariant | null) => {
        if (selectedVariantData && selectedVariantData.quantity > 0) {
            try {
                await dispatch(addCart({ productVariantId: selectedVariantData.id, quantity: 1 })).unwrap();
                showToast(true, "Added to cart successfully");
                dispatch(getCart());
            } catch (error) {
                console.error(error);
                showToast(false, "Failed to add to cart");
            }
        } else {
            showToast(false, "Product is out of stock");
        }
    };

    return { handleAddToCart };
};


export const getValidSortBy = (value: string | null): "name" | "createdAt" | undefined => {
    return value === "name" || value === "createdAt" ? value : "createdAt";
};

export const getValidSortOrder = (value: string | null): "asc" | "desc" | undefined => {
    return value === "asc" || value === "desc" ? value : "desc";
};

export const formatDateVN = (isoString: string | Date): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};