import styled from "styled-components";
import {type Dispatch, type SetStateAction} from "react";
import useCategoriesList from "@hooks/useCategoriesList.tsx";
import type {ProductsFiltersType} from "@hooks/useProductsList.tsx";
import {convertToNumber} from "@helpers/convertToNumber.ts";
import {Check} from "lucide-react";

interface Props {
    filtersState: [ProductsFiltersType, Dispatch<SetStateAction<ProductsFiltersType>>];
}

export default function CatalogFilters(props: Props) {
    const [filters, setFilters] = props.filtersState;
    const {list: categories} = useCategoriesList();;

    const update = (patch: Partial<ProductsFiltersType>) => {
        setFilters((prev) => {
            return {...prev, ...patch};
        });
    };

    const toggleCategory = (category: string) => {
        if (!filters.categories.includes(category)) {
            update({categories: filters.categories.concat(category)});
            return;
        }
        update({categories: filters.categories.filter(c => c !== category)});
    }

    return (
        <Wrapper>
            <Scroll>
                <Section>
                    <SectionTitle>
                        Ціна
                    </SectionTitle>

                    <PriceRow>
                        <PriceInput placeholder={"від"} value={filters.start_price ?? ""}
                                    onChange={e => {
                                        const value = convertToNumber(e.target.value, filters.start_price);
                                        update({start_price: value});
                                    }}
                        />

                        <Divider />

                        <PriceInput placeholder={"до"} value={filters.end_price ?? ""}
                                    onChange={e => {
                                        const value = convertToNumber(e.target.value, filters.end_price);
                                        update({end_price: value});
                                    }}
                        />
                    </PriceRow>
                </Section>

                <Section>
                    <SectionTitle>Категорії</SectionTitle>
                    <CategoriesList>
                        {categories.map(category => (
                            <CategoryItem key={category} onClick={() => toggleCategory(category)}>
                                <CategoryLeft>
                                    <Checkbox
                                        checked={filters.categories.includes(category)}
                                    >
                                        {filters.categories.includes(category) && (
                                            <Check size={12} strokeWidth={3} />
                                        )}
                                    </Checkbox>

                                    <CategoryInfo>
                                        <CategoryName>
                                            {category}
                                        </CategoryName>
                                    </CategoryInfo>
                                </CategoryLeft>
                            </CategoryItem>
                        ))}
                    </CategoriesList>
                </Section>
            </Scroll>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 320px;
    min-width: 320px;
    height: calc(100vh - 110px);

    background: white;

    border: 1px solid #e2e8f0;
    border-radius: 8px;

    overflow: hidden;

    box-shadow:
            0 8px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const Scroll = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;

    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #dbe4ee;
        border-radius: 999px;
    }
`;

const Section = styled.div`
    padding: 18px;

    border-bottom: 1px solid #edf2f7;

    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }
`;

const SectionTitle = styled.div`
    font-size: 17px;
    font-weight: 800;

    color: #0f172a;
`;

const PriceRow = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 14px;

    box-sizing: border-box;
`;

const Divider = styled.div`
    width: 8px;
    height: 2px;

    min-width: 8px;

    border-radius: 999px;

    background: #cbd5e1;
`;

const PriceInput = styled.input`
    width: 100%;
    min-width: 0;

    height: 42px;

    padding: 0 14px;

    border-radius: 10px;

    border: 1px solid #dbe4ee;

    outline: none;

    background: #f8fafc;

    font-size: 14px;
    font-weight: 600;

    transition: 0.16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #94a3b8;
        background: white;
    }

    &::placeholder {
        color: #94a3b8;
    }
`;

const CategoriesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 10px;
`;

const CategoryItem = styled.div`

    padding: 8px 10px;

    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    transition: 0.14s ease;

    cursor: pointer;

    box-sizing: border-box;

    &:hover {
        background: #f8fafc;
    }
`;

const CategoryLeft = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;

    flex: 1;

    min-width: 0;
`;

const Checkbox = styled.div<{ checked?: boolean }>`
    width: 17px;
    height: 17px;

    min-width: 17px;

    margin-top: 2px;

    border-radius: 5px;

    border: 1.5px solid ${({ checked }) =>
            checked ? "#16a34a" : "#cbd5e1"};

    background: ${({ checked }) =>
            checked ? "#16a34a" : "white"};

    transition: 0.14s ease;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;

    ${CategoryItem}:hover & {
        border-color: ${({ checked }) =>
                checked ? "#16a34a" : "#64748b"};
    }
`;

const CategoryInfo = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 0;
`;

const CategoryName = styled.div`
    font-size: 14px;
    font-weight: 600;

    line-height: 1.35;

    color: #0f172a;

    word-break: break-word;
`;