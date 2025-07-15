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

export interface GeometryDTO {
  type: string;
  coordinates: number[][][];
}

export interface GeoJSONDTO {
  type: string;
  properties: Object;
  geometry: GeometryDTO;
}

export interface SecondThemeDTO {
  NAME: string;
  DESCRIPTION: string;
  HYPERLINK: string;
  CASE_SIZE: string;
  MAPTIP: string;
  SYMBOLCOLOR: string;
  Type: string;
  LatLng: number[][];
  GeoJSON: GeoJSONDTO;
}

export interface FirstThemeDTO {
  FeatCount: number;
  Theme_Name: string;
  Category: string;
  Owner: string;
  DateTime: string;
  Published_Date: string;
  Formatted_DateTime: string;
  Formatted_Published_Date: string;
}

export interface RetrieveThemeDTO {
  SrchResults: [FirstThemeDTO, ...SecondThemeDTO[]];
}
