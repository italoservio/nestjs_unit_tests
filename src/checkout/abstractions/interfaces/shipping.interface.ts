import {TRegion} from '../types/region.type';

export interface IShipping {
  region: TRegion;
  city: string;
  state: string;
  zip: string;
}
