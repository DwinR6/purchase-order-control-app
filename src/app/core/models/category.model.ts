export interface Category {
  id: number;
  type: string; // 'product' | 'service'
  name: string;
  description: string;
  url_image: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
