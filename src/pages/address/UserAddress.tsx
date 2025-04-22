import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AddNewAddress from "@/pages/address/AddNewAddress";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteAddress, getAddressList, setDefaultAddress } from "@/redux/address/address.thunk";
import { toast } from "@/hooks/use-toast";

// interface AddressListProps {
//   addresses: Address[];
//   onSetDefault: (id: string) => void;
//   onUpdate: (id: string) => void;
//   onDelete: (id: string) => void;
// }

const UserAddress: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { addressList, loading } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddressList());
  }, [dispatch]);

  const handleSetDefaultAddress = (addressId: string) => {
    dispatch(setDefaultAddress(addressId)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast({ title: "Set default address successfully" });
        dispatch(getAddressList());
      } else {
        toast({ title: "Error", variant: "destructive" });
      }
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    dispatch(deleteAddress(addressId)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast({ title: "Delete address successfully" });
        dispatch(getAddressList());
      } else {
        toast({ title: "Error", variant: "destructive" });
      }
    });
  };

  // const addressList: AddressListProps = {
  //   addresses: [
  //     {
  //       id: "1",
  //       fullName: "bui vuong",
  //       phone: "0398779258",
  //       address: "47 Nguyễn Khả Trạc, Mai Dịch, Cầu Giấy, Hà Nội, Phường Mai Dịch, Quận Cầu Giấy",
  //       isDefault: true,
  //     },
  //     {
  //       id: "2",
  //       fullName: "bui vuong",
  //       phone: "0398779258",
  //       address: "60 Nguyễn Khả Trạc, Mai Dịch, Cầu Giấy, Hà Nội, Phường Mai Dịch, Quận Cầu Giấy",
  //       isDefault: false,
  //     },
  //   ],
  //   onSetDefault: (id) => console.log("Set default", id),
  //   onUpdate: (id) => console.log("Set update", id),
  //   onDelete: (id) => console.log("Set delete", id),
  // };

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
          {addressList.map((addr) => (
            <div
              key={addr.id}
              className="border-b pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="text-base space-y-5">
                <div className="flex items-center gap-2 font-medium lg:text-lg">
                  {/* {addr.customer} */}
                  {addr.isDefault && (
                    <Badge variant="outline" className="border-gray-400 rounded-4xl">
                      <span className="flex items-center gap-1 text-gray-700 w-15 h-5 ">
                        <i className="ri-star-fill"></i> Default
                      </span>
                    </Badge>
                  )}
                </div>
                {/* <div className="text-muted-foreground text-gray-500">{addr.customer}</div> */}
                <div className="text-muted-foreground text-gray-500">{addr.address}</div>
                <div className="text-muted-foreground text-gray-500">{addr.wardName}</div>
                <div className="text-muted-foreground text-gray-500">{addr.districtName}</div>
                <div className="text-muted-foreground text-gray-500">{addr.provinceName}</div>

              </div>
              <div className="flex gap-4">
                {!addr.isDefault && (
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100"
                    onClick={() => handleSetDefaultAddress(addr.id)}
                  >
                    Set as default
                  </Button>
                )}
                <Button
                  variant="link"
                  className="hover:text-gray-700 text-blue-600"
                // onClick={() => addressList.onUpdate(addr.id)}
                >
                  Update
                </Button>
                <Button
                  variant="link"
                  className="hover:text-gray-700 text-blue-600"
                  onClick={() => handleDeleteAddress(addr.id)}
                >
                  Deleted
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
