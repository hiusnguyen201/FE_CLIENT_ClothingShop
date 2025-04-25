import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { Navigate } from "react-router-dom";

const UserInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.account);

  if (!user) {
    return Navigate({ to: "/" })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium pl-3 mb-4">Account Information</h2>
      <div className="grid grid-cols-2 gap-y-4 lg:mr-50">
        <div className="text-gray-600 font-medium">Name</div>
        <div className="text-black mr-30">{user.name}</div>

        <div className="text-gray-600 font-medium">Phone number</div>
        <div className="text-black">{user.phone}</div>

        <div className="text-gray-600 font-medium">Gender</div>
        <div className="text-black capitalize">{user.gender}</div>

        <div className="text-gray-600 font-medium">
          Day of Birth{" "}
          <span className="relative before:content-['('] after:content-[')'] text-sm italic">yyyy/dd/mm</span>{" "}
        </div>
        <div className="text-black capitalize">1999/11/11</div>

        <div className="text-gray-600 font-medium">Height</div>
        <div className="text-black capitalize">123cm</div>

        <div className="text-gray-600 font-medium">Weight</div>
        <div className="text-black capitalize">123kg</div>
      </div>
      <Button className="mt-6 bg-white border text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100">Cập nhật</Button>

      <h2 className="text-2xl font-medium pl-3 mb-4">Login Information</h2>
      <div className="grid grid-cols-2 gap-y-4 lg:mr-50">
        <div className="text-gray-600 font-medium">Email</div>
        <div className="text-black mr-30">{user.email}</div>

        <div className="text-gray-600 font-medium">Password</div>
        <div className="text-black">*******</div>
      </div>
      <Button className="mt-3 bg-white border text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100">Cập nhật</Button>
    </div>
  );
};

export default UserInfo;
