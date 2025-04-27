import { Option, OptionValue } from "./product";

export interface Cart {
    productVariant: ProductVariant;
    quantity: number;
};

export interface AddCart {
    productId: string;
    productVariantId: string;
    quantity: number;
};

export interface ProductVariant {
    _id: string;
    price: number;
    product: {
        _id: string;
        name: string;
        thumbnail: string;
    };
    quantity: number;
    sku: string;
    sold: number;
    variantValues: {
        option: Option;
        optionValue: OptionValue;
        id: string;
    }[];
}