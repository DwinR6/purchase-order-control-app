export interface Provider {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}
