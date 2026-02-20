import { IMedicine } from "./medicine.type";

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";

export interface IOrderItem {
    id: string;
    orderId: string;
    medicineId: string;
    quantity: number;
    unitPrice: number;
    medicine: IMedicine;
}

export interface IOrder {
    id: string;
    orderNo: string;
    totalAmount: number;
    dueAmount: number;
    status: OrderStatus;
    shippingAddress: string;
    contactNumber: string;
    customerId: string;
    createdAt: string;
    updatedAt: string;
    orderItems: IOrderItem[];
    customer?: {
        name: string;
        email: string;
        image?: string;
    };
}

export interface ICreateOrderPayload {
    cartItemIds: string[];
    shippingAddress: string;
    contactNumber: string;
}
