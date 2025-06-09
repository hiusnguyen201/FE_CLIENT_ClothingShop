import { Fragment, useEffect } from "react";
import AddressSheet from "@/pages/address/AddressSheet";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteAddress, getAddressList, setDefaultAddress } from "@/redux/address/address.thunk";
import { showToast } from "@/utils/toast";
import { LoadingCenter } from "@/components/LoadingCenter";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
import { MAX_ADDRESS_PER_USER } from "@/types/constant";

const AddressPage = () => {
  const dispatch = useAppDispatch();
  const { addressList, loading } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAddressList());
  }, [dispatch]);

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await dispatch(setDefaultAddress({ id: addressId })).unwrap();
      showToast(true, "Set default address successfully");
    } catch (error: any) {
      showToast(false, error || "Something went wrong");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await dispatch(deleteAddress({ id: addressId })).unwrap();
      showToast(true, "Delete address successfully");
    } catch (error: any) {
      showToast(false, error || "Something went wrong");
    }
  };

  const sortedAddresses = [...addressList].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  const isDisabled = addressList.length + 1 > MAX_ADDRESS_PER_USER || loading.getAddressList;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
        <h2 className="text-2xl font-medium w-full">My Address</h2>
        <div
          className="w-full text-end"
          onClick={() => isDisabled && showToast(false, `Address limit ${MAX_ADDRESS_PER_USER}`)}>
          <AddressSheet
            text="Add new address"
            disabled={isDisabled}
            type="add"
          />
        </div>
      </div>

      {loading.getAddressList ? (
        <LoadingCenter />
      ) : sortedAddresses.length ? (
        <>
          {sortedAddresses.map((address) => (
            <Fragment key={address.id}>
              <div
                className="flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div className="flex flex-col gap-2">
                  {address.isDefault && (
                    <Badge variant="outline" className="border-gray-400 rounded-4xl">
                      <div className="flex items-center gap-1 text-gray-700 w-15 h-5 ">
                        <StarIcon className="w-4 h-4" />
                        <span>Default</span>
                      </div>
                    </Badge>
                  )}
                  <div>Address: {address.address}</div>
                  <div>{address.wardName}, {address.districtName}, {address.provinceName}</div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  {!address.isDefault && (
                    <LoadingButton
                      variant="outline"
                      disabled={loading.setDefaultAddress}
                      loading={loading.setDefaultAddress}
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      Set as default
                    </LoadingButton>
                  )}

                  <AddressSheet
                    disabled={false}
                    text="Update"
                    data={address}
                    type="update"
                  />

                  {!address.isDefault && (
                    <LoadingButton
                      variant="default"
                      disabled={loading.deleteAddress}
                      loading={loading.deleteAddress}
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      Delete
                    </LoadingButton>
                  )}
                </div>
              </div>
              <Separator />
            </Fragment>
          ))}
        </>
      ) : (
        <div className="text-center py-10 text-muted-foreground text-lg">Please add your address</div>
      )}
    </div>
  );
};

export default AddressPage;
