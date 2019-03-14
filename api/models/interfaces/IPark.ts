export interface IPark {
  type: string;
  features: Feature[];
  crs: CRS;
  bbox: number[];
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  code: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  geometry_name: string;
  properties: FeatureProperties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface FeatureProperties {
  id: string;
  tilbud: string;
  placering: string;
  beskrivelse: string;
  ejer: string;
  point: string;
  lat: string;
  lon: string;
}
