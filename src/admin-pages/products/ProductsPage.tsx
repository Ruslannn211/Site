import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    CheckCircle2,
    Clock3,
    Package,
    Plus,
    Search,
    ShoppingCart,
    Star,
    TrendingUp, Truck,
} from "lucide-react";
import ProductModal from "@admin-pages/products/product-modal/ProductModal.tsx";
import useProductsList from "@hooks/useProductsList.tsx";
import ProductItem from "@admin-pages/products/src/ProductItem.tsx";
import StatCardAdmin from "@components/ui/StatCardAdmin.tsx";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

const ProductsPage: FC = () => {
    const [productOpen, setProductOpen] = useState(false);
    const [search, setSearch] = useState("");

    const {list: products} = useProductsList();

    const totalOrders = useMemo(() => {
        return products.reduce(
            (acc, product) =>
                acc + product.orders,
            0
        );
    }, [products]);

    const averageRating = useMemo(() => {
        if (!products.length) {
            return 0;
        }

        return (
            products.reduce(
                (acc, product) =>
                    acc + product.rating,
                0
            ) / products.length
        );
    }, [products]);

    const conversion = useMemo(() => {
        if (!products.length) {
            return 0;
        }

        const soldProducts =
            products.filter(
                product => product.orders > 0
            ).length;

        return (
            (soldProducts / products.length) *
            100
        );
    }, [products]);

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>Товари</PageTitle>
                    <PageDescription>Управління товарами магазину</PageDescription>
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
                            placeholder={"Пошук товарів..."}
                        />
                    </SearchBlock>
                    <AddButton>
                        <Plus size={18} />
                        Додати товар
                    </AddButton>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCardAdmin icon={<Package size={18} />} label={"Всього товарів"} value={buildNumberFormat(products.length)} />
                <StatCardAdmin icon={<ShoppingCart size={18} />} label={"Замовлень"} value={buildNumberFormat(totalOrders)} />
                <StatCardAdmin icon={<TrendingUp size={18} />} label={"Конверсія"} value={`${conversion}%`} />
                <StatCardAdmin icon={<Star size={18} />} label={"Середній рейтинг"} value={`${averageRating}`} />
            </StatsGrid>

            <ProductsList>
                {products.map(product => (
                    <ProductItem key={product.id} product={product} openProduct={() => setProductOpen(true)} />
                ))}
            </ProductsList>
            <ProductModal open={productOpen} onClose={() => setProductOpen(false)} />
        </Container>
    );
};

export default ProductsPage;

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

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const StatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

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

const ProductsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;