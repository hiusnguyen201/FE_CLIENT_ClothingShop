import { FC, useRef } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UpdateInfoUserSchema } from "./schema/updateInfoUser";
import { updateProfile } from "@/redux/account/account.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Gender } from "@/types/constant";
import { showToast } from "@/utils/toast";
import { LoadingButton } from "@/components/LoadingButton";
import { User } from "@/types/user";
import { InputFormikField } from "@/components/formik-fields";
import { Label } from "@/components/ui/label";

interface UpdateUserInfoProps {
  userInfo: User;
}

const UpdateInfoUserSheet: FC<UpdateUserInfoProps> = ({ userInfo }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.account);
  const closeRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: userInfo?.name || "",
      phone: userInfo?.phone || "",
      gender: userInfo?.gender || "",
    },
    validationSchema: UpdateInfoUserSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          updateProfile({
            name: values.fullName,
            gender: values.gender as Gender,
            phone: values.phone,
          })
        ).unwrap();
        closeRef.current?.click();
        showToast(true, "Updated");
      } catch (error: any) {
        showToast(false, error || "Something went wrong");
      }
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="min-w-36" variant="outline">
          Update info
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen w-screen md:h-auto md:max-w-md">
        <SheetHeader>
          <SheetTitle>Update info</SheetTitle>
          <SheetDescription>Click save when you're done.</SheetDescription>
        </SheetHeader>

        <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
          <InputFormikField label="Name" name="fullName" type="text" formikProps={formik} required />
          <InputFormikField label="Phone" name="phone" type="tel" formikProps={formik} required />

          <div className="">
            <Label>Gender</Label>
            <RadioGroup
              defaultValue={formik.values.gender}
              className="flex gap-4 mt-2"
              onValueChange={(val) => formik.setFieldValue("gender", val)}
            >
              {["male", "female"].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={val} className="" />
                  <Label htmlFor={val}>{val === "male" ? "Male" : "Female"}</Label>
                </div>
              ))}
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </div>

          <SheetFooter>
            <LoadingButton type="submit" loading={loading.updateProfile} disabled={loading.updateProfile}>
              Save
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

export default UpdateInfoUserSheet;
