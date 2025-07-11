export interface LoginOneMapDTO {
  access_token: string;
  expiry_timestamp: string;
}

export interface AddressDTO {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface SearchAddressDTO {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: AddressDTO[];
}
