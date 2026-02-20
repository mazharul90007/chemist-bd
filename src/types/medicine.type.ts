export interface IMedicineCategory {
  id: string;
  categoryName: string;
  categoryDetails?: string;
  categoryStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IMedicine {
  id: string;
  sellerId: string;
  name: string;
  generic_name?: string | null;
  strength?: string;
  company?: string;
  photoUrl?: string;
  quantity?: number;
  price: number;
  Indications?: string | null;
  Pharmacology?: string | null;
  type?: string;
  categoryId: string;
  dosage?: string;
  side_effects?: string;
  popular?: boolean;
  rating?: number | undefined;
  warnings?: string;
  discount?: number;
  createdAt: string;
  updatedAt: string;
  category: IMedicineCategory;
  seller?: {
    id: string;
    name: string;
    email: string;
  };
}
