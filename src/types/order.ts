import { Product } from "./product";
import { User } from "./user";

export interface Order {
  id: string;
  orderDate: Date | string;
  provinceName: string;
  districtName: string;
  wardName: string;
  address: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingFee: number;
  trackingNumber: string | null;
  orderStatusHistory: OrderStatusHistory[];
  customer: User;
  payment: Payment | null;
  orderDetails: OrderDetail[];
  quantity: number;
  subTotal: number;
  total: number;
  code: number;
}

export interface OrderStatusHistory {
  id: string;
  status: string;
  updatedAt: Date | string;
  note?: string;
}

export interface OrderDetail {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: Product;
  variant: Variant;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Payment {
  id: string;
  paymentUrl: string | null;
  qrCodeUrl: string | null;
  paymentMethod: string;
  amountPaid: number | null;
  paidDate: Date | string | null;
  status: string;
  order: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Variant {
  id: string;
  quantity: number;
  price: number;
  sku: string;
  sold: number;
  product: string;
  variantValues: VariantValue[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface VariantValue {
  id: string;
  option: {
    id: string;
    name: string;
  };
  optionValue: {
    id: string;
    valueName: string;
  };
}