import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AddNewAddress from "@/pages/address/AddNewAddress";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteAddress, getAddressList, setDefaultAddress } from "@/redux/address/address.thunk";
import { toast } from "@/hooks/use-toast";
import { showToast } from "@/utils/toast";

const UserAddress: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { addressList, loading } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddressList());
  }, [dispatch]);

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      const res = await dispatch(setDefaultAddress(addressId)).unwrap();
      showToast(true, "Set default address successfully");
      dispatch(getAddressList());
    } catch (error) {
      showToast(false, "Error");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      showToast(true, "Delete address successfully");
      dispatch(getAddressList());
    } catch (error) {
      showToast(false, "Error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-medium">My Address</h2>
        <Button className="w-34 h-12 border" onClick={() => setIsDrawerOpen(true)}>
          Add new address
        </Button>
      </div>

      <h4 className="text-lg font-medium py-10 border-t border-gray-200">Address</h4>
      {loading.getAddressList ? <div>Loading...</div> : addressList.length ? (
        <div className="space-y-6">
          {addressList.map((address) => (
            <div
              key={address.id}
              className="border-b pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="text-base space-y-5">
                <div className="flex items-center gap-2 font-medium lg:text-lg">
                  {address.isDefault && (
                    <Badge variant="outline" className="border-gray-400 rounded-4xl">
                      <span className="flex items-center gap-1 text-gray-700 w-15 h-5 ">
                        <i className="ri-star-fill"></i> Default
                      </span>
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground text-gray-500">Address: {address.address}</div>
                <div className="text-muted-foreground text-gray-500">Ward: {address.wardName}</div>
                <div className="text-muted-foreground text-gray-500">District: {address.districtName}</div>
                <div className="text-muted-foreground text-gray-500">Province: {address.provinceName}</div>
              </div>
              <div className="flex gap-4">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100"
                    onClick={() => handleSetDefaultAddress(address.id)}
                  >
                    Set as default
                  </Button>
                )}
                {/* <Button
                  variant="link"
                  className="hover:text-gray-700 text-blue-600"
                // onClick={() => addressList.onUpdate(addr.id)}
                >
                  Update
                </Button> */}
                <Button
                  variant="link"
                  className="hover:text-gray-700 text-blue-600"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground text-lg">Please add your address</div>
      )}

      <AddNewAddress isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default UserAddress;
