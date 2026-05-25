import type {ProductListType, ProductType} from "@types-lib";

export const buildProductPrice = (product: ProductType | ProductListType) => {
    const {price} = product;
    const discount = product.discount ?? 0;
    return discount > 0 ? price * (1 - discount / 100) : price;
}