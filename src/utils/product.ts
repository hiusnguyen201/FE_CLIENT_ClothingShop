import { Cart } from "@/types/cart";

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

export const calculateTotalPrice = (cartItems: Cart[]): number => {
    return cartItems.reduce((total: number, item: Cart) => {
        const itemPrice = item.productVariant.price * item.quantity;
        return total + itemPrice;
    }, 0);
}