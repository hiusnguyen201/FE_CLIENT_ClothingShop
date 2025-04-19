import AddressDropdown from "@/components/ShippingAddress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import PaymentMethodCart from "@/pages/cart/PaymentMethodCart";

const InformationOrder: React.FC = () => {
  return (
    <div className="px-5">
      <h1 className="text-2xl text-gray-900 font-bold">Ordering Information</h1>
      <div className="border-b border-gray-200 my-5 space-y-6">
        <div className=" flex w-full space-x-6 ">
          <div className="w-2/3">
            <Label htmlFor="fullName" className="text-md text-gray-700 mb-1">
              Full Name
            </Label>
            <Input
              id="fullName"
              className="border border-gray-400 p-6 rounded-4xl"
              placeholder="Enter your full name"
            />
          </div>
          <div className="w-1/3">
            <Label htmlFor="phoneNumber" className="text-md text-gray-700 mb-1">
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              className="border border-gray-400 p-6 rounded-4xl"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-md text-gray-700 mb-1">
            Email
          </Label>
          <Input id="email" className="border border-gray-400 p-6 rounded-4xl" placeholder="Enter your email" />
        </div>

        <div>
          <AddressDropdown />
        </div>
        {/* dropdown address */}

        <div>
          <Label htmlFor="note" className="text-md text-gray-700 mb-1">
            Note
          </Label>
          <Input
            id="note"
            className="border border-gray-400 p-6 rounded-4xl"
            placeholder="Enter your notes (eg: office hours)"
          />
        </div>
        <div className="flex mb-10">
          <input type="checkbox" className="w-4 h-4 mt-1" />
          <span className="text-md text-gray-800 pl-2">Save to address book for next purchase</span>
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-2xl text-gray-900 font-bold">Payment Method</h1>
        <div>
          <PaymentMethodCart />
        </div>
      </div>
    </div>
  );
};

export default InformationOrder;
