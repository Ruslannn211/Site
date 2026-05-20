import {type FC} from "react";
import styled from "styled-components";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import CatalogFilters from "./src/CatalogFilters.tsx";
import ProductModal from "./product-modal/ProductModal.tsx";
import useProductsList from "@hooks/useProductsList.tsx";
import ProductItem from "@pages/products/src/ProductItem.tsx";

const ProductsPage: FC = () => {
    const {list} = useProductsList();

    return (
        <Container>
            <CatalogFilters />

            <Content>
                <TopBlock>
                    <BlockTitle>
                        Товари спеціально для вас
                    </BlockTitle>

                    <BlockDescription>
                        Популярні товари та найкращі пропозиції магазину
                    </BlockDescription>
                </TopBlock>

                <ProductsGrid>
                    {list.map(product => (
                        <ProductItem product={product} key={product.id} />
                    ))}
                </ProductsGrid>

                {/*<Pagination>
                    <PaginationButton disabled>
                        <ChevronLeft size={18} />
                    </PaginationButton>

                    {Array.from({length: 2}).map((_, index) => (
                        <PageButton
                            key={index}
                            active={1 === index + 1}
                        >
                            {index + 1}
                        </PageButton>
                    ))}

                    <PaginationButton>
                        <ChevronRight size={18} />
                    </PaginationButton>
                </Pagination>*/}
            </Content>
            <ProductModal />
        </Container>
    );
};

export default ProductsPage;

const Container = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    gap: 18px;

    padding: 18px;

    box-sizing: border-box;

    background: #f8fafc;

    min-height: calc(100vh - 78px);

    overflow: hidden;
`;

const Content = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
`;

const TopBlock = styled.div`
    margin-bottom: 18px;
    margin-top: 4px;
`;

const BlockTitle = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const BlockDescription = styled.div`
    margin-top: 4px;

    color: #64748b;

    font-size: 14px;
`;

const ProductsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

    gap: 8px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    margin-top: 26px;
`;

const PaginationButton = styled.button`
    width: 38px;
    height: 38px;

    border-radius: 10px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const PageButton = styled.button<{ active: boolean }>`
    width: 38px;
    height: 38px;

    border-radius: 10px;

    border: 1px solid ${({active}) =>
    active ? "#111827" : "#e2e8f0"};

    background: ${({active}) =>
    active ? "#111827" : "white"};

    color: ${({active}) =>
    active ? "white" : "#0f172a"};

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;
`;