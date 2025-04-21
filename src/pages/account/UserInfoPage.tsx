import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { User, USER_STATUS } from "@/types/user";
import React from "react";

const UserInfo: React.FC = () => {
  const { user } = useAppSelector(
    state => state.account
  );

  const userInformation: User = {
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    gender: user?.gender ?? "",
    email: user?.email ?? "",
    status: user?.status ?? USER_STATUS.ACTIVE,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium pl-3 mb-4">Account Information</h2>
      <div className="grid grid-cols-2 gap-y-4 lg:mr-50">
        <div className="text-gray-600 font-medium">Name</div>
        <div className="text-black mr-30">{userInformation.name}</div>

        <div className="text-gray-600 font-medium">Phone number</div>
        <div className="text-black">{userInformation.phone}</div>

        <div className="text-gray-600 font-medium">Gender</div>
        <div className="text-black capitalize">{userInformation.gender}</div>

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
        <div className="text-black mr-30">{userInformation.email}</div>

        <div className="text-gray-600 font-medium">Password</div>
        <div className="text-black">*******</div>
      </div>
      <Button className="mt-3 bg-white border text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100">Cập nhật</Button>
    </div>
  );
};

export default UserInfo;
