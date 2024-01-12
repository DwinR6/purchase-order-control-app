import { Specification } from "./specification.model";

export interface OrderItem {
  id: number;
  product: any;
  quantity: number;
  price: number;
  total_amount: number;
  specifications: Specification[];
}
