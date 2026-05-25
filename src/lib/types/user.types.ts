export interface UserType {
    id: number;
    first_name: string;
    last_name: string | null;
    patronymic: string | null;
    email: string | null;
    phone_number: string | null;
    isAdmin: boolean | null;
    updatedAt: string;
    createdAt: string;
}

export type ProductListType = {
    id: number;
    code: string;
    delivery: "client" | "free" | null;
    description: string | null;
    category: string;
    name: string;
    price: number;
    count: number;
    discount: number | null;
    guarantee: number;
    badge: "promotion" | "top" | "new" | null;
    previewImage: string | null;
    orders: number
    createdAt: string;
}

export type RepairPriceType = {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
}

export type ProductFeatureType = {
    id: number;
    label: string;
    value: string;
    createdAt: string;
}

export type ProductType = {
    id: number;
    code: string;
    delivery: "client" | "free" | null;
    description: string | null;
    category: string;
    name: string;
    price: number;
    count: number;
    discount: number | null;
    guarantee: number;
    badge: "promotion" | "top" | "new" | null;
    images: string[];
    features: ProductFeatureType[];
    createdAt: string;
}