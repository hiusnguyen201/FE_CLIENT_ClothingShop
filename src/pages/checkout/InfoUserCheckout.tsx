import { Card } from "@/components/ui/card";
import React from "react";

interface InfoUserOrderProps {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  address: string;
}

interface ShippingInfoProps {
  infoUserOrder: InfoUserOrderProps;
}

const InfoUserCheckout: React.FC<ShippingInfoProps> = ({ infoUserOrder }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Delivery information</h2>
      <Card className="bg-gray-100 p-6 rounded-2xl space-y-3 text-sm md:text-base w-full max-w-5xl mx-auto mt-6 border-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 space-y-3">
          <div className="font-medium">Recipient name:</div>
          <div>{infoUserOrder.name}</div>

          <div className="font-medium">Email:</div>
          <div>{infoUserOrder.email}</div>

          <div className="font-medium">Phone number:</div>
          <div>{infoUserOrder.phone}</div>

          <div className="font-medium">Payment method:</div>
          <div>{infoUserOrder.paymentMethod.toUpperCase()}</div>

          <div className="font-medium col-span-1 md:col-span-1">Delivery address:</div>
          <div className="md:col-span-1">{infoUserOrder.address}</div>
        </div>
      </Card>
    </div>
  );
};

export default InfoUserCheckout;
