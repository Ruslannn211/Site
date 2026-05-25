import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import CatalogFilters from "./src/CatalogFilters.tsx";
import ProductModal from "./product-modal/ProductModal.tsx";
import useProductsList, {type ProductsFiltersType} from "@hooks/useProductsList.tsx";
import ProductItem from "@pages/products/src/ProductItem.tsx";
import {hasActiveFilters} from "@helpers/hasActiveFilters.ts";
import {Search} from "lucide-react";

const ProductsPage: FC = () => {
    const [filters, setFilters] = useState<ProductsFiltersType>({
        start_price: null, end_price: null, ids: [], categories: [], search: null
    });
    const {list} = useProductsList(filters);

    const isActiveFilters = useMemo(() => hasActiveFilters(filters), [filters]);

    const update = (patch: Partial<ProductsFiltersType>) => {
        setFilters((prev) => {
            return {...prev, ...patch};
        });
    };

    return (
        <Container>
            <CatalogFilters filtersState={[filters, setFilters]} />

            <Content>
                <TopBlock>
                    <SearchWrapper>
                        <SearchIcon>
                            <Search size={18} />
                        </SearchIcon>
                        <SearchInput placeholder={"Пошук товарів, комплектуючих..."}
                                     onChange={e => {
                                         const value = e.target.value;
                                         update({search: value.trim().length > 0 ? value : null})
                                     }} value={filters.search ?? ''}
                        />
                    </SearchWrapper>

                    <BlockTitle>
                        {isActiveFilters ? 'Всі товари за вашим пошуком' : 'Усі товари магазину'}
                    </BlockTitle>

                    <BlockDescription>
                        Обирайте категорії, використовуйте фільтри та знаходьте потрібні товари для себе
                    </BlockDescription>
                </TopBlock>

                <ProductsGrid>
                    {list.map(product => (
                        <ProductItem product={product} key={product.id} />
                    ))}
                </ProductsGrid>
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

const SearchWrapper = styled.div`
    flex: 1;

    height: 42px;

    position: relative;

    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const SearchIcon = styled.div`
    position: absolute;

    left: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #64748b;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;

    padding: 0 18px 0 46px;

    border-radius: 6px;

    border: 1px solid #e2e8f0;

    outline: none;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    font-size: 14px;
    font-weight: 500;

    color: #0f172a;

    transition: 0.18s ease;

    box-sizing: border-box;

    box-shadow:
            inset 0 1px 2px rgba(15,23,42,0.03);

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #94a3b8;

        box-shadow:
                0 0 0 4px rgba(148,163,184,0.10),
                inset 0 1px 2px rgba(15,23,42,0.03);
    }
`;