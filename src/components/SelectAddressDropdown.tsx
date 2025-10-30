import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FormikProps } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getDistricts, getProvinces, getWards } from "@/redux/division/division.thunk";

interface FormValues {
  address: string;
  provinceId: string;
  districtId: string;
  wardCode: string;
  isDefault: boolean;
}

interface SelectAddressDropdownProps {
  formik: FormikProps<FormValues>;
}

const SelectAddressDropdown: React.FC<SelectAddressDropdownProps> = ({ formik }) => {
  const dispatch = useAppDispatch();
  const { provinces, districts, wards } = useAppSelector((state) => state.division);

  // Fetch Provinces
  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  // Fetch Districts when Province changes
  useEffect(() => {
    const provinceId = formik.values.provinceId;
    if (!provinceId) return;
    dispatch(getDistricts({ provinceId }))
  }, [dispatch, formik.values.provinceId]);

  // Fetch Wards when District changes
  useEffect(() => {
    const districtId = formik.values.districtId;
    if (!districtId) return;
    dispatch(getWards({ districtId }))
  }, [dispatch, formik.values.districtId]);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="address" className="text-md">
        Address
      </Label>

      <Input
        id="address"
        name="address"
        placeholder="Enter your address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.address && formik.errors.address && (
        <span className="text-red-500 text-sm">{formik.errors.address}</span>
      )}

      {/* Province */}
      <Label className="text-md">Provinces</Label>
      <Select
        value={formik.values.provinceId}
        onValueChange={(value) => {
          formik.setFieldValue("provinceId", value)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="-- Select Provinces --" />
        </SelectTrigger>
        <SelectContent>
          {provinces?.map((p) => (
            <SelectItem
              key={p?.ProvinceID}
              value={String(p?.ProvinceID)}
            >
              {p?.ProvinceName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formik.touched.provinceId && formik.errors.provinceId && (
        <span className="text-red-500 text-sm">{formik.errors.provinceId}</span>
      )}

      {/* District */}
      <Label>Districts</Label>
      <Select
        value={formik.values.districtId}
        onValueChange={(value) => {
          formik.setFieldValue("districtId", value)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="-- Select Districts --" />
        </SelectTrigger>
        <SelectContent>
          {districts?.map((d) => (
            <SelectItem key={d?.DistrictID} value={String(d?.DistrictID)}>
              {d?.DistrictName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formik.touched.districtId && formik.errors.districtId && (
        <span className="text-red-500 text-sm">{formik.errors.districtId}</span>
      )}

      {/* Ward */}
      <Label>Wards</Label>
      <Select
        value={formik.values.wardCode}
        onValueChange={(value) => formik.setFieldValue("wardCode", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="-- Select Wards --" />
        </SelectTrigger>
        <SelectContent>
          {wards?.map((w) => (
            <SelectItem key={w?.WardCode} value={String(w?.WardCode)}>
              {w?.WardName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formik.touched.wardCode && formik.errors.wardCode && (
        <span className="text-red-500 text-sm">{formik.errors.wardCode}</span>
      )}
    </div>
  );
};

export default SelectAddressDropdown;
