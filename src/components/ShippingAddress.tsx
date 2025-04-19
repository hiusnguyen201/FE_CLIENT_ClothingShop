import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const GHN_TOKEN = import.meta.env.VITE_GHN_TOKEN;
const GHN_API = import.meta.env.VITE_GHN_API;

interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

interface District {
  DistrictID: number;
  DistrictName: string;
}

interface Ward {
  WardCode: string;
  WardName: string;
}

const AddressDropdown: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // Fetch Provinces
  useEffect(() => {
    axios
      .get(`${GHN_API}/province`, {
        headers: { Token: GHN_TOKEN },
      })
      .then((res) => setProvinces(res.data.data))
      .catch(console.error);
  }, []);

  // Fetch Districts when Province changes
  useEffect(() => {
    if (!selectedProvince) return;
    axios
      .post(`${GHN_API}/district`, { province_id: Number(selectedProvince) }, { headers: { Token: GHN_TOKEN } })
      .then((res) => setDistricts(res.data.data))
      .catch(console.error);
  }, [selectedProvince]);

  // Fetch Wards when District changes
  useEffect(() => {
    if (!selectedDistrict) return;
    axios
      .post(`${GHN_API}/ward`, { district_id: Number(selectedDistrict) }, { headers: { Token: GHN_TOKEN } })
      .then((res) => setWards(res.data.data))
      .catch(console.error);
  }, [selectedDistrict]);

  return (
    <div className="space-y-4 w-full">
      <div>
        <Label htmlFor="address" className="text-md text-gray-700 mb-1">
          Address
        </Label>
        <Input
          id="address"
          className="border border-gray-400 p-6 rounded-4xl"
          placeholder="Enter your address (eg: 123 Cau Giay , Ha Noi )"
        />
      </div>
      <div className="lg:flex justify-between text-gray-800 text-md">
        {/* Province */}
        <div className="relative overflow-visible z-50">
          <Label className="block font-medium text-md mb-1">Tỉnh / Thành phố</Label>
          <Select
            onValueChange={(value) => {
              setSelectedProvince(value);
              setSelectedDistrict("");
              setSelectedWard("");
              setDistricts([]);
              setWards([]);
            }}
          >
            <SelectTrigger className="w-full p-6 border border-gray-500 px-3 rounded-4xl flex items-center min-w-50">
              <SelectValue placeholder="-- Chọn tỉnh / thành phố --" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white shadow-xl rounded-xl border border-gray-300 ">
              {provinces.map((p) => (
                <SelectItem key={p.ProvinceID} value={String(p.ProvinceID)}>
                  {p.ProvinceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="relative overflow-visible z-40 ">
          <Label className="block font-medium text-md mb-1">Quận / Huyện</Label>
          <Select
            onValueChange={(value) => {
              setSelectedDistrict(value);
              setSelectedWard("");
              setWards([]);
            }}
          >
            <SelectTrigger className="w-full p-6 border border-gray-500 px-3 rounded-4xl flex items-center min-w-50">
              <SelectValue placeholder="-- Chọn quận / huyện --" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white shadow-xl rounded-xl border border-gray-300">
              {districts.map((d) => (
                <SelectItem key={d.DistrictID} value={String(d.DistrictID)}>
                  {d.DistrictName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ward */}
        <div className="relative overflow-visible z-30">
          <Label className="block font-medium text-md mb-1">Phường / Xã</Label>
          <Select onValueChange={(value) => setSelectedWard(value)}>
            <SelectTrigger className="w-full p-6 border border-gray-500 px-3 rounded-4xl flex items-center min-w-50">
              <SelectValue placeholder="-- Chọn phường / xã --" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white shadow-xl rounded-xl border border-gray-300">
              {wards.map((w) => (
                <SelectItem key={w.WardCode} value={String(w.WardCode)}>
                  {w.WardName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AddressDropdown;
