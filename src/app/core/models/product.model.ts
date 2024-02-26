import { Attachment } from "./attachment.model";
import { Category } from "./category.model";
import { Specification } from "./specification.model";

export interface Product {
  id: number;
  type: string;
  name: string;
  category: Category;
  description: string;
  unit: string;
  price: number;
  specifications: Specification[];
  attachments: Attachment[];
  stock_quantity: number;
  provider: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

