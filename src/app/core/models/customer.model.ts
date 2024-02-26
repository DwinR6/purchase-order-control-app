import { Address } from "./address.model";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresses: Address[];
  created_at: string;
  updated_at: string;
}
