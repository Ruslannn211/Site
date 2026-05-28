import {useState} from "react";

import api from "@api";

import type {
    ProductListType,
    ProductFeatureType,
    ProductType,
} from "@types-lib";

type ProductFormType = Pick<
    ProductType,
    | "name"
    | "code"
    | "description"
    | "category"
    | "price"
    | "count"
    | "discount"
    | "guarantee"
    | "badge"
    | "delivery"
>;

interface Props {
    form: ProductFormType;

    images: File[];

    features: ProductFeatureType[];
}

const useProductCreate = () => {
    const [loading, setLoading] =
        useState(false);

    async function handle(props: Props) {
        const {
            form,
            images,
            features,
        } = props;

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("code", form.code);

            formData.append(
                "description",
                form.description || ""
            );

            formData.append(
                "category",
                form.category
            );

            formData.append(
                "price",
                String(form.price)
            );

            formData.append(
                "count",
                String(form.count)
            );

            formData.append(
                "discount",
                form.discount !== null
                    ? String(form.discount)
                    : ""
            );

            formData.append(
                "guarantee",
                form.guarantee !== null
                    ? String(form.guarantee)
                    : ""
            );

            formData.append(
                "badge",
                form.badge || ""
            );

            formData.append(
                "delivery",
                form.delivery || ""
            );

            formData.append(
                "features",
                JSON.stringify(features)
            );

            images.forEach(image => {
                formData.append(
                    "images",
                    image
                );
            });

            const data =
                await api.post<ProductListType>(
                    "/admin/products/create/",
                    formData,
                    {
                        skipJsonContentType: true,
                    }
                );

            return data;
        } finally {
            setLoading(false);
        }
    }

    return {
        handle,
        loading,
    };
};

export default useProductCreate;