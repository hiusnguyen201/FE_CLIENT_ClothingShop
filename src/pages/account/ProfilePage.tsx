import { User } from "@/types/user";
import React from "react";
import UpdateUserInfo from "@/pages/account/UpdateInfoUserSheet";
import UpdatePasswordSheet from "@/pages/account/UpdatePasswordSheet";
import { useAppSelector } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.account);
  const { logout } = useAuth();

  const userInformation: User = {
    id: user?.id ?? "",
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    gender: user?.gender ?? "",
    email: user?.email ?? "",
  };

  const handleLogout = async () => {
    await logout();
    showToast(true, "Logout successfully");
    window.location.reload();
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

          <UpdatePasswordSheet />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="min-w-36">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
