import {type FC} from "react";
import styled from "styled-components";
import type {ProductType} from "@types-lib";

interface Props {
    product: ProductType;
}

const ProductFeatureList: FC<Props> = (props) => {
    return (
        <Container>
            {props.product.features.map(feature => (
                <Characteristic>
                    <Label>{feature.label}</Label>
                    <Value>{feature.value}</Value>
                </Characteristic>
            ))}
        </Container>
    );
};

export default ProductFeatureList;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 24px;
`;

const Characteristic = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 10px;

    border-bottom: 1px solid #edf2f7;
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const Value = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;