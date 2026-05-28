export type OrderProductType = {
    id: number;
    orderId: number;
    productId: number;
    count: number;
    price: number;
    name: string;
    previewImage: string | null;
    updatedAt?: string;
    createdAt?: string;
}

export type OrderListType = {
    id: number;
    userId: number | null;
    client_name: string;
    phone_number: string;
    email: string;
    post_office: string | null;
    post_city: string | null;
    payment_type: "upon-receipt" | "online";
    delivery: "new-post" | "pickup";
    status: "new" | "in-processing" | "delivered" | "completed";
    updatedAt: string;
    createdAt: string;
    products: OrderProductType[];
}

export type RepairOrderPriceType = {
    id: number;
    orderId: number;
    priceId: number;
    price: number;
    name: string;
    updatedAt?: string;
    createdAt?: string;
}

export type RepairOrderListType = {
    id: number;
    userId: number | null;
    client_name: string;
    phone_number: string;
    phone_model: string;
    description: string | null;
    status: "new" | "diagnostics" | "under-repair" | "awaiting-details" | "completed";
    updatedAt: string;
    createdAt: string;
    price_list: RepairOrderPriceType[];
}

export interface UserListType {
    id: number;
    first_name: string;
    last_name: string | null;
    patronymic: string | null;
    email: string | null;
    phone_number: string | null;
    isAdmin: boolean;
    updatedAt: string;
    createdAt: string;
    ordersCount: number;
    repairsOrdersCount: number;
    totalSpent: number;
}