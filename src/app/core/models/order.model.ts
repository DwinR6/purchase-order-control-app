import { Attachment } from "./attachment.model";
import { Customer } from "./customer.model";
import { Note } from "./note.model";
import { OrderItem } from "./order-item.model";

export interface Order {
  id: number;
  order_number: string;
  order_date: string;
  delivery_date: string;
  items: OrderItem[];
  customer: Customer;
  total_amount: number;
  status: string;
  notes: Note[];
  attachments: Attachment[];
}
