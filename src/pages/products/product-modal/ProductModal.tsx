import {type FC, useEffect} from "react";
import styled from "styled-components";
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    ShieldCheck,
    ShoppingCart,
    Star,
    Truck,
} from "lucide-react";
import useProductOpen from "@pages/products/product-modal/hooks/useProductOpen.tsx";
import {useNavigate} from "react-router-dom";
import useProductOne from "@hooks/useProductOne.tsx";
import ImagesWrapper from "@pages/products/product-modal/src/ImagesWrapper.tsx";
import {buildProducrPrice} from "@helpers/buildProducrPrice.ts";
import { buildNumberFormat } from "@helpers/buildNumberFormat";
import ProductFeatureList from "@pages/products/product-modal/src/ProductFeatureList.tsx";
import useCart from "@hooks/useCart.tsx";

const ProductPage: FC = () => {
    const params = useProductOpen();
    const navigate = useNavigate();

    const {product} = useProductOne(params.product);
    const cart = useCart();
    const inCart = product ? cart.isInCart(product.id) : false;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && params.product) {
                navigate("/products")
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [params.product]);

    return (
        <Container open={!!params.product}>
            <Content>
                <TopTabs>
                    <BackButton onClick={() => navigate("/products")}>
                        <ArrowLeft size={16} />
                        Назад
                    </BackButton>

                    <Tabs>
                        <Tab active>
                            Про товар
                        </Tab>

                        <Tab>
                            Характеристики
                        </Tab>

                        <Tab>
                            Відгуки та питання
                        </Tab>
                    </Tabs>
                </TopTabs>

                {product && (
                    <Grid>
                        <ImagesWrapper product={product} />
                        <Right>
                            <StatusRow>
                                <Status>{product.count > 0 ? "Є в наявності" : "-"}</Status>
                                <Code>Код: {product.code}</Code>
                            </StatusRow>

                            <Title>{product.name}</Title>

                            {/*<RatingRow>
                                <Stars>
                                    <StarFill />
                                    <StarFill />
                                    <StarFill />
                                    <StarFill />
                                    <StarFill />
                                </Stars>

                                <RatingValue>
                                    4.9
                                </RatingValue>

                                <Reviews>
                                    <MessageCircle size={13} />

                                    284 відгуки
                                </Reviews>
                            </RatingRow>*/}

                            <PriceSection>
                                {(product.discount ?? 0) > 0 && (
                                    <OldPrice>
                                        {buildNumberFormat(product.price)} ₴
                                    </OldPrice>
                                )}

                                <PriceRow>
                                    <CurrentPrice>
                                        {buildNumberFormat(buildProducrPrice(product))} ₴
                                    </CurrentPrice>

                                    {(product.discount ?? 0) > 0 && (
                                        <Discount>
                                            -{product.discount}%
                                        </Discount>
                                    )}
                                </PriceRow>
                            </PriceSection>

                            {!!product.description && (
                                <Description>
                                    {product.description}
                                </Description>
                            )}

                            <ProductFeatureList product={product} />

                            <ButtonsRow>
                                <BuyButton $disabled={inCart} onClick={() => !inCart && cart.addToCart(product.id)}>
                                    <ShoppingCart size={18} />

                                    {inCart ? "Вже у кошику" : "Додати до кошику"}
                                </BuyButton>

                                <FavoriteButton>
                                    <Heart size={18} />
                                </FavoriteButton>
                            </ButtonsRow>

                            <Advantages>
                                {product.delivery === "free" && (
                                    <Advantage>
                                        <AdvantageIcon>
                                            <Truck size={16} />
                                        </AdvantageIcon>

                                        <AdvantageText>
                                            Безкоштовна доставка
                                        </AdvantageText>
                                    </Advantage>
                                )}

                                {!!product.guarantee && product.guarantee > 0 && (
                                    <Advantage>
                                        <AdvantageIcon>
                                            <ShieldCheck size={16} />
                                        </AdvantageIcon>

                                        <AdvantageText>
                                            Гарантія {product.guarantee} місяців
                                        </AdvantageText>
                                    </Advantage>
                                )}
                            </Advantages>
                        </Right>
                    </Grid>
                )}
            </Content>
        </Container>
    );
};

export default ProductPage;

const Content = styled.div`
    width: 100%;
    max-width: 1380px;

    margin: 0 auto;

    padding: 16px;

    box-sizing: border-box;
`;

const TopTabs = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    margin-bottom: 10px;

    min-height: 64px;
    z-index: 2;

    padding: 10px 16px;

    border-radius: 16px;

    background: white;

    border: 1px solid #e5e7eb;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;

    box-shadow:
            0 4px 14px rgba(15,23,42,0.04);
`;

const BackButton = styled.button`
    height: 42px;

    padding: 0 16px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    color: #0f172a;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    flex-shrink: 0;

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow:
                0 8px 16px rgba(15,23,42,0.06);
    }
`;

const Tabs = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    flex-wrap: wrap;
`;

const Tab = styled.button<{ active?: boolean }>`
    position: relative;

    height: 36px;

    padding: 0 16px;

    border: none;
    border-radius: 12px;

    background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.10)"
        : "transparent"};

    color: ${({ active }) =>
    active
        ? "#16a34a"
        : "#0f172a"};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: ${({ active }) =>
    active ? 800 : 700};

    white-space: nowrap;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.10)"
        : "#f8fafc"};
    }

    &::after {
        content: "";

        position: absolute;

        left: 14px;
        right: 14px;
        bottom: 6px;

        height: 2px;

        border-radius: 999px;

        background: ${({ active }) =>
    active
        ? "#22c55e"
        : "transparent"};

        transition: 0.16s ease;
    }
`;

const Grid = styled.div`
    position: relative;
    display: grid;

    grid-template-columns: 480px 1fr;

    gap: 18px;

    align-items: start;
`;

const Right = styled.div`
    position: relative;
    background: white;

    border: 1px solid #e2e8f0;

    border-radius: 14px;

    padding: 22px;

    box-shadow:
            0 6px 20px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const StatusRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Status = styled.div`
    height: 28px;

    padding: 0 10px;

    border-radius: 999px;

    background: rgba(34,197,94,0.12);

    color: #16a34a;

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const Code = styled.div`
    font-size: 12px;
    font-weight: 600;

    color: #94a3b8;
`;

const Title = styled.div`
    margin-top: 14px;

    font-size: 28px;
    font-weight: 900;

    line-height: 1.14;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 5px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StarFill = styled(Star)`
    width: 16px;
    height: 16px;

    fill: #f59e0b;
    color: #f59e0b;
`;

const RatingValue = styled.div`
    font-size: 13px;
    font-weight: 800;

    color: #0f172a;
`;

const Reviews = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const PriceSection = styled.div`
    margin-top: 10px;
`;

const OldPrice = styled.div`
    font-size: 18px;
    font-weight: 700;

    color: #94a3b8;

    text-decoration: line-through;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 5px;
`;

const CurrentPrice = styled.div`
    font-size: 40px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #ef4444;
`;

const Discount = styled.div`
    height: 28px;

    padding: 0 10px;

    border-radius: 999px;

    background: #ef4444;

    color: white;

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const Description = styled.div`
    margin-top: 22px;

    font-size: 14px;
    line-height: 1.7;

    color: #475569;
`;

const Characteristics = styled.div`
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

const ButtonsRow = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 28px;
`;

const BuyButton = styled.button<{$disabled?: boolean}>`
    flex: 1;

    height: 50px;

    border: none;
    border-radius: 12px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow: 0 10px 22px rgba(34, 197, 94, 0.22);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }

    ${p => p.$disabled && `
        box-shadow: 0 10px 22px rgba(166, 208, 181, 0.22);
        background: linear-gradient(
            135deg,
            #909893 0%,
            #bfc9c4 100%
        );
        
        cursor: default;
        &:hover {
            transform: none;
        }
    `}
`;

const FavoriteButton = styled.button`
    width: 50px;
    height: 50px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background: white;

    color: #f59e0b;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: #f8fafc;
    }
`;

const Advantages = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 22px;
`;

const Advantage = styled.div`
    flex: 1;

    padding: 14px;

    border-radius: 12px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    gap: 10px;
`;

const AdvantageIcon = styled.div`
    width: 32px;
    height: 32px;

    min-width: 32px;

    border-radius: 10px;

    background: white;

    border: 1px solid #e2e8f0;

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const AdvantageText = styled.div`
    font-size: 12px;
    font-weight: 700;

    color: #0f172a;
`;

const Container = styled.div<{ open: boolean }>`
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 80;

    background: #f8fafc;

    overflow-y: auto;

    opacity: ${({ open }) =>
            open ? 1 : 0};

    pointer-events: ${({ open }) =>
            open ? "all" : "none"};

    transition: opacity 0.24s ease;

    box-sizing: border-box;
`;