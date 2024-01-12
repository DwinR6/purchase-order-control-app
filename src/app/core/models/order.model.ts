import { Attachment } from "./attachment.model";
import { OrderItem } from "./order-item.model";

export interface Order {
  id: number;
  order_number: string;
  order_date: string;
  items: OrderItem[];
  customer: any;
  address: string;
  total_amount: number;
  status: string;
  notes: string;
  attachments: Attachment[];
}
