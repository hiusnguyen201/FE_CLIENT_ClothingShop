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
    <div>
      <h2 className="text-2xl font-semibold text-center">Delivery information</h2>

      <Card className="px-4">
        <div className="text-center md:text-left">
          <p className="">Recipient name: {infoUserOrder.name}</p>
          <p className="">Email: {infoUserOrder.email}</p>
          <p className="">Phone number: {infoUserOrder.phone}</p>
          <p>Payment method: <span className="uppercase">{infoUserOrder.paymentMethod}</span></p>
          <p className="">Delivery address: {infoUserOrder.address}</p>
        </div>
      </Card>
    </div>
  );
};

export default InfoUserCheckout;
