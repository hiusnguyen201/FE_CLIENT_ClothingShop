export interface Address {
  id: string;
  address: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  isDefault: boolean;
  customer: string;
}

export interface NewAddress {
  address: string;
  provinceId: string;
  districtId: string;
  wardCode: string;
  isDefault: boolean;
}

export interface Province {
  ProvinceID: string;
  ProvinceName: string;
}

export interface District {
  DistrictID: string;
  DistrictName: string;
}

export interface Ward {
  WardCode: string;
  WardName: string;
}
