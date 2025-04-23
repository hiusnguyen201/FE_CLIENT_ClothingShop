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
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  isDefault: boolean;
}


export interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

export interface District {
  DistrictID: number;
  DistrictName: string;
}

export interface Ward {
  WardCode: string;
  WardName: string;
}