import {Search} from "lucide-react";
import styled from "styled-components";
import {useMemo, useState} from "react";
import useCategoriesList from "@hooks/useCategoriesList.tsx";

const BRANDS = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Sony",
    "ASUS",
    "Lenovo",
];

export default function CatalogFilters() {
    const [search, setSearch] = useState("");
    const {list} = useCategoriesList();

    const filteredCategories = useMemo(() => {
        return list.filter(c =>
            c.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, list]);

    return (
        <Wrapper>
            <Scroll>
                <Section>
                    <SectionTitle>
                        Ціна
                    </SectionTitle>

                    <PriceRow>
                        <PriceInput placeholder={"від"} />

                        <Divider />

                        <PriceInput placeholder={"до"} />
                    </PriceRow>
                </Section>

                <Section>
                    <SectionTitle>
                        Каталог
                    </SectionTitle>

                    <SearchWrapper>
                        <SearchInput
                            placeholder={"Пошук категорії"}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <SearchIcon>
                            <Search size={16} />
                        </SearchIcon>
                    </SearchWrapper>

                    <CategoriesList>
                        {filteredCategories.map(category => (
                            <CategoryItem key={category}>
                                <CategoryLeft>
                                    <Checkbox />

                                    <CategoryInfo>
                                        <CategoryName>
                                            {category}
                                        </CategoryName>

                                        {/*<CategoryCount>
                                            {category.count}
                                        </CategoryCount>*/}
                                    </CategoryInfo>
                                </CategoryLeft>
                            </CategoryItem>
                        ))}
                    </CategoriesList>
                </Section>

                {/*<Section>
                    <SectionTitle>
                        Бренд
                    </SectionTitle>

                    <BrandsList>
                        {BRANDS.map(brand => (
                            <BrandItem key={brand}>
                                <BrandLeft>
                                    <Checkbox />

                                    <BrandName>
                                        {brand}
                                    </BrandName>
                                </BrandLeft>
                            </BrandItem>
                        ))}
                    </BrandsList>
                </Section>

                <Section>
                    <SectionTitle>
                        Наявність
                    </SectionTitle>

                    <BrandsList>
                        <BrandItem>
                            <BrandLeft>
                                <Checkbox />

                                <BrandName>
                                    Є в наявності
                                </BrandName>
                            </BrandLeft>
                        </BrandItem>

                        <BrandItem>
                            <BrandLeft>
                                <Checkbox />

                                <BrandName>
                                    Акційні товари
                                </BrandName>
                            </BrandLeft>
                        </BrandItem>
                    </BrandsList>
                </Section>*/}
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

const SearchWrapper = styled.div`
    position: relative;

    margin-top: 14px;
    margin-bottom: 12px;

    width: 100%;

    box-sizing: border-box;
`;

const SearchInput = styled.input`
    width: 100%;

    height: 42px;

    padding: 0 40px 0 14px;

    border-radius: 10px;

    border: 1px solid #dbe4ee;

    outline: none;

    background: #f8fafc;

    font-size: 14px;

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

const SearchIcon = styled.div`
    position: absolute;

    right: 14px;
    top: 50%;

    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;

    color: #94a3b8;
`;

const CategoriesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const CategoryItem = styled.div`
    min-height: 50px;

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

const Checkbox = styled.div`
    width: 17px;
    height: 17px;

    min-width: 17px;

    margin-top: 2px;

    border-radius: 5px;

    border: 1.5px solid #cbd5e1;

    background: white;

    transition: 0.14s ease;

    box-sizing: border-box;

    ${CategoryItem}:hover & {
        border-color: #64748b;
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

const CategoryCount = styled.div`
    margin-top: 2px;

    font-size: 12px;
    font-weight: 600;

    color: #94a3b8;
`;

const BrandsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    margin-top: 12px;
`;

const BrandItem = styled.div`
    height: 42px;

    padding: 0 10px;

    border-radius: 10px;

    display: flex;
    align-items: center;

    transition: 0.14s ease;

    cursor: pointer;

    box-sizing: border-box;

    &:hover {
        background: #f8fafc;
    }
`;

const BrandLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BrandName = styled.div`
    font-size: 14px;
    font-weight: 600;

    color: #0f172a;
`;