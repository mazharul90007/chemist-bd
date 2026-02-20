import { IMedicine } from "./medicine.type";

export interface ICartItem {
    id: string;
    cartId: string;
    medicineId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    medicine: Partial<IMedicine>;
}

export interface ICart {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    cartItems: ICartItem[];
}
