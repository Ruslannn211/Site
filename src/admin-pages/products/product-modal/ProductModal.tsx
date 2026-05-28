import {type FC, useState} from "react";
import styled from "styled-components";
import {Package2, X} from "lucide-react";

import type {ProductFeatureType, ProductListType, ProductType,} from "@types-lib";
import ImagesBlock from "@admin-pages/products/product-modal/src/ImagesBlock.tsx";
import FormBlock from "@admin-pages/products/product-modal/src/FormBlock.tsx";
import FeaturesBlock from "@admin-pages/products/product-modal/src/FeaturesBlock.tsx";
import useProductCreate from "@hooks/useProductCreate.tsx";
import Spinner from "@components/ui/Spinner.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    addProduct: (product: ProductListType) => void;
}

export type ProductFormType = Pick<
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

const defaultForm: ProductFormType = {
    name: "",
    code: "",
    description: "",
    category: "",
    price: 0,
    count: 0,
    discount: null,
    guarantee: 0,
    badge: null,
    delivery: null,
};

const ProductModal: FC<Props> = (props) => {
    const {onClose, open, addProduct} = props;

    const {handle, loading} = useProductCreate();

    const [form, setForm] = useState<ProductFormType>(defaultForm);
    const [images, setImages] = useState<File[]>([]);
    const [features, setFeatures] = useState<ProductFeatureType[]>([]);

    if (!open) {
        return null;
    }

    async function submit() {
        const result = await handle({form, images, features});
        if (result) {
            addProduct(result);
            onClose();
        }
    }

    return (
        <Overlay>
            <Modal>
                <Header>
                    <HeaderLeft>
                        <HeaderIcon>
                            <Package2 size={20}/>
                        </HeaderIcon>

                        <HeaderInfo>
                            <Title>Створення товару</Title>
                            <Description>Новий товар магазину</Description>
                        </HeaderInfo>
                    </HeaderLeft>

                    <CloseButton onClick={onClose}>
                        <X size={18}/>
                    </CloseButton>
                </Header>

                <Content>
                    <Left>
                        <ImagesBlock imagesState={[images, setImages]} />
                        <FormBlock formState={[form, setForm]} />
                    </Left>
                    <FeaturesBlock featuresState={[features, setFeatures]} />
                </Content>

                <Footer>
                    <CancelButton onClick={onClose}>
                        Скасувати
                    </CancelButton>

                    <SaveButton onClick={submit} disabled={loading}>
                        {loading ? (<Spinner />) : ("Створити товар")}
                    </SaveButton>
                </Footer>
            </Modal>
        </Overlay>
    );
};

export default ProductModal;

const Overlay = styled.div`
    position: fixed;
    inset: 0;

    z-index: 500;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: radial-gradient(
            circle at top,
            rgba(34, 197, 94, .05),
            transparent 30%
    ),
    rgba(15, 23, 42, .42);

    backdrop-filter: blur(10px);
`;

const Modal = styled.div`
    width: 100%;
    max-width: 1380px;

    height: calc(100vh - 48px);

    border-radius: 30px;

    overflow: hidden;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    flex-direction: column;

    box-shadow: 0 30px 80px rgba(15, 23, 42, .16);
`;

const Header = styled.div`
    min-height: 86px;

    padding: 0 28px;

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const HeaderIcon = styled.div`
    width: 48px;
    height: 48px;

    border-radius: 16px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 26px;
    font-weight: 900;

    letter-spacing: -.04em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 3px;

    font-size: 13px;

    color: #64748b;
`;

const CloseButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Content = styled.div`
    flex: 1;

    display: grid;

    grid-template-columns: 1fr 400px;

    min-height: 0;
`;

const Left = styled.div`
    overflow-y: auto;

    padding: 28px;

    display: flex;
    flex-direction: column;
    gap: 28px;

    box-sizing: border-box;
`;

const Footer = styled.div`
    min-height: 86px;

    padding: 0 28px;

    border-top: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;

    box-sizing: border-box;
`;

const CancelButton = styled.button`
    height: 48px;

    padding: 0 22px;

    border-radius: 16px;

    border: 1px solid #e2e8f0;

    background: white;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;
`;

const SaveButton = styled.button`
    height: 48px;

    padding: 0 24px;

    border: none;

    border-radius: 16px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow: 0 14px 28px rgba(34, 197, 94, .18);
`;