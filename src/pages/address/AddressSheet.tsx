import { FC, useRef } from "react";
import { Button } from "@/components/ui/button";
import SelectAddressDropdown from "@/components/SelectAddressDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { AddNewAddressSchema } from "./schema/selectAddressSchema";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addAddress, updateAddress } from "@/redux/address/address.thunk";
import { showToast } from "@/utils/toast";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LoadingButton } from "@/components/LoadingButton";
import { Address } from "@/types/division";
import { Nullable } from "@/types/common";

interface AddressSheetProps {
  disabled: boolean
  text: string
  data?: Nullable<Address>
  type: "add" | "update"
}

const AddressSheet: FC<AddressSheetProps> = ({ disabled, text, data, type }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.address);

  const closeRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik({
    initialValues: {
      address: data?.address || "",
      provinceCode: "",
      districtCode: "",
      wardCode: "",
      isDefault: data?.isDefault || false,
    },
    validationSchema: AddNewAddressSchema,
    onSubmit: async (values) => {
      try {
        if (type === "add") {
          await dispatch(addAddress(values)).unwrap();
        }
        if (type === "update") {
          await dispatch(updateAddress({
            ...values,
            addressId: data!.id
          }
          )).unwrap();
        }
        formik.resetForm();
        closeRef.current?.click();
        showToast(true, `${type} address successfully`);
      } catch (error: any) {
        showToast(false, error || "Something went wrong");
      }
    }
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full md:w-max"
          variant="outline"
          onClick={() => formik.resetForm()}
          disabled={disabled}
        >
          {text}
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen w-screen md:h-auto md:max-w-md">
        <SheetHeader>
          <SheetTitle>{text}</SheetTitle>
          <SheetDescription>
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={formik.handleSubmit}
        >
          <SelectAddressDropdown formik={formik} />

          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="default"
              className="w-4 h-4"
              checked={formik.values.isDefault}
              onChange={(e) => formik.setFieldValue("isDefault", e.target.checked)}
            />
            <Label htmlFor="default" className="text-sm font-medium">
              Set as default
            </Label>
          </div>

          <SheetFooter>
            <LoadingButton
              type="submit"
              loading={loading.addAddress} disabled={loading.addAddress}>
              {type === "add" ? "Add new address" : "Update address"}
            </LoadingButton>
          </SheetFooter>
        </form>

        <SheetClose asChild>
          <button ref={closeRef} className="hidden" />
        </SheetClose>

      </SheetContent>
    </Sheet>
  );
};

export default AddressSheet;
