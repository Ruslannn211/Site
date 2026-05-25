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