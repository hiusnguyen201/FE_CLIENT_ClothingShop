import { User } from "@/types/user";
import React from "react";
import UpdateUserInfo from "@/pages/account/UpdateInfoUser";
import UpdateAccountUser from "@/pages/account/UpdateAccountUser";
import { useAppSelector } from "@/redux/store";

const UserInfo: React.FC = () => {
  const { user } = useAppSelector((state) => state.account);

  const userInformation: User = {
    id: user?.id ?? "",
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    gender: user?.gender ?? "",
    email: user?.email ?? "",
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium text-center md:text-left">Account Information</h2>

        <div className="grid grid-cols-2 gap-4 md:px-8">
          <div className="text-gray-600 font-medium md:text-right">Name</div>
          <div className="text-black">{userInformation.name}</div>

          <div className="text-gray-600 font-medium md:text-right">Phone</div>
          <div className="text-black">{userInformation.phone}</div>

          <div className="text-gray-600 font-medium md:text-right">Email</div>
          <div className="text-black">{userInformation.email}</div>

          <div className="text-gray-600 font-medium md:text-right">Gender</div>
          <div className="text-black capitalize">{userInformation.gender}</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <UpdateUserInfo userInfo={userInformation} />

          <UpdateAccountUser />
        </div>

      </div>

    </>
  );
};

export default UserInfo;
