import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    FolderTree,
    Package,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import CategoryModal from "@admin-pages/categories/category-modal/CategoryModal.tsx";

interface Category {
    id: number;
    title: string;
    slug: string;
    products: number;
}

const MOCK_CATEGORIES: Category[] = [
    {
        id: 1,
        title: "Смартфони",
        slug: "smartphones",
        products: 182,
    },

    {
        id: 2,
        title: "Ноутбуки",
        slug: "laptops",
        products: 94,
    },

    {
        id: 3,
        title: "Навушники",
        slug: "headphones",
        products: 58,
    },

    {
        id: 4,
        title: "Комплектуючі",
        slug: "components",
        products: 326,
    },

    {
        id: 5,
        title: "Телевізори",
        slug: "tv",
        products: 42,
    },
];

const CategoriesPage: FC = () => {
    const [categories] = useState(MOCK_CATEGORIES);

    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [categories, search]);

    const totalProducts = useMemo(() => {
        return categories.reduce(
            (acc, category) =>
                acc + category.products,
            0
        );
    }, [categories]);

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>
                        Категорії
                    </PageTitle>

                    <PageDescription>
                        Управління категоріями товарів
                    </PageDescription>
                </TopLeft>

                <TopRight>
                    <SearchBlock>
                        <Search size={16} />

                        <SearchInput
                            value={search}
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder={
                                "Пошук категорії..."
                            }
                        />
                    </SearchBlock>

                    <AddButton onClick={() => setModal(true)}>
                        <Plus size={18} />

                        Додати категорію
                    </AddButton>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCard>
                    <StatIcon>
                        <FolderTree size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {categories.length}
                        </StatValue>

                        <StatLabel>
                            Всього категорій
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Package size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {totalProducts}
                        </StatValue>

                        <StatLabel>
                            Товарів в магазині
                        </StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <CategoriesGrid>
                {filteredCategories.map(category => (
                    <CategoryCard
                        key={category.id}
                    >
                        <CategoryTop>
                            <CategoryIcon>
                                <FolderTree
                                    size={20}
                                />
                            </CategoryIcon>

                            <CategoryActions>
                                <ActionButton>
                                    <Pencil
                                        size={15}
                                    />
                                </ActionButton>

                                <ActionButton
                                    danger
                                >
                                    <Trash2
                                        size={15}
                                    />
                                </ActionButton>
                            </CategoryActions>
                        </CategoryTop>

                        <CategoryTitle>
                            {category.title}
                        </CategoryTitle>

                        <CategorySlug>
                            /{category.slug}
                        </CategorySlug>

                        <CategoryBottom>
                            <ProductsBadge>
                                <Package size={14} />

                                {
                                    category.products
                                }{" "}
                                товарів
                            </ProductsBadge>
                        </CategoryBottom>
                    </CategoryCard>
                ))}
            </CategoriesGrid>
            <CategoryModal open={modal} onClose={() => setModal(false)} />
        </Container>
    );
};

export default CategoriesPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const TopLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageTitle = styled.div`
    font-size: 34px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const PageDescription = styled.div`
    margin-top: 8px;

    font-size: 14px;

    color: #64748b;
`;

const TopRight = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const SearchBlock = styled.div`
    width: 320px;
    height: 46px;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 0 14px;

    color: #94a3b8;

    box-sizing: border-box;
`;

const SearchInput = styled.input`
    flex: 1;

    border: none;
    outline: none;

    background: transparent;

    font-size: 14px;
`;

const AddButton = styled.button`
    height: 46px;

    padding: 0 18px;

    border: none;
    border-radius: 14px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    transition: 0.16s ease;

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);

    &:hover {
        transform: translateY(-1px);
    }
`;

const StatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;
`;

const StatCard = styled.div`
    min-height: 110px;

    padding: 18px;

    border-radius: 20px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 16px;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const StatIcon = styled.div`
    width: 52px;
    height: 52px;

    border-radius: 16px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatValue = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const StatLabel = styled.div`
    margin-top: 4px;

    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const CategoriesGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

    gap: 5px;
`;

const CategoryCard = styled.div`
    padding: 20px;

    border-radius: 22px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-2px);

        box-shadow:
                0 18px 30px rgba(15,23,42,0.08);
    }
`;

const CategoryTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CategoryIcon = styled.div`
    width: 54px;
    height: 54px;

    border-radius: 18px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);
`;

const CategoryActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
    width: 40px;
    height: 40px;

    border-radius: 12px;

    border: 1px solid ${({ danger }) =>
    danger
        ? "rgba(239,68,68,0.16)"
        : "#e2e8f0"};

    background: ${({ danger }) =>
    danger
        ? "rgba(239,68,68,0.08)"
        : "white"};

    color: ${({ danger }) =>
    danger
        ? "#ef4444"
        : "#0f172a"};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const CategoryTitle = styled.div`
    margin-top: 20px;

    font-size: 22px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const CategorySlug = styled.div`
    margin-top: 8px;

    font-size: 14px;
    font-weight: 600;

    color: #64748b;
`;

const CategoryBottom = styled.div`
    margin-top: 22px;
`;

const ProductsBadge = styled.div`
    width: fit-content;

    height: 36px;

    padding: 0 14px;

    border-radius: 999px;

    background: rgba(34,197,94,0.10);

    color: #16a34a;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 13px;
    font-weight: 800;
`;