import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    Check,
    ChevronRight,
    CreditCard,
    MapPin,
    Truck,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

const PRODUCTS = [
    {
        id: 1,
        title: "iPhone 15 Pro Max 256GB",
        image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
        price: 62999,
        count: 1,
    },

    {
        id: 2,
        title: "AirPods Pro 2 USB-C",
        image:
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
        price: 10999,
        count: 2,
    },
];

const DELIVERY_PRICE = 220;

const CheckoutPage: FC = () => {
    const [delivery, setDelivery] =
        useState<"nova" | "pickup">("nova");
    const navigate = useNavigate();

    const total = useMemo(() => {
        return PRODUCTS.reduce(
            (acc, product) =>
                acc +
                product.price * product.count,
            0
        );
    }, []);

    const finalPrice =
        total +
        (delivery === "nova"
            ? DELIVERY_PRICE
            : 0);

    return (
        <Container>
            <Content>
                <Left>
                    <Section>
                        <SectionTitle>
                            Контактні дані
                        </SectionTitle>

                        <InputsGrid>
                            <InputBlock>
                                <Label>
                                    Ім’я та прізвище
                                </Label>

                                <Input
                                    placeholder={
                                        "Ваше ім’я"
                                    }
                                />
                            </InputBlock>

                            <InputBlock>
                                <Label>
                                    Номер телефону
                                </Label>

                                <Input
                                    placeholder={
                                        "+380"
                                    }
                                />
                            </InputBlock>

                            <InputBlock full>
                                <Label>
                                    Email
                                </Label>

                                <Input
                                    placeholder={
                                        "example@gmail.com"
                                    }
                                />
                            </InputBlock>
                        </InputsGrid>
                    </Section>

                    <Section>
                        <SectionTitle>
                            Доставка
                        </SectionTitle>

                        <DeliveryList>
                            <DeliveryCard
                                active={
                                    delivery ===
                                    "nova"
                                }
                                onClick={() =>
                                    setDelivery(
                                        "nova"
                                    )
                                }
                            >
                                <DeliveryLeft>
                                    <DeliveryIcon
                                        active={
                                            delivery ===
                                            "nova"
                                        }
                                    >
                                        <Truck
                                            size={18}
                                        />
                                    </DeliveryIcon>

                                    <DeliveryInfo>
                                        <DeliveryTitle>
                                            Нова Пошта
                                        </DeliveryTitle>

                                        <DeliveryDescription>
                                            Доставка у
                                            відділення
                                            або поштомат
                                        </DeliveryDescription>
                                    </DeliveryInfo>
                                </DeliveryLeft>

                                {delivery ===
                                    "nova" && (
                                        <CheckCircle>
                                            <Check
                                                size={
                                                    14
                                                }
                                            />
                                        </CheckCircle>
                                    )}
                            </DeliveryCard>

                            <DeliveryCard
                                active={
                                    delivery ===
                                    "pickup"
                                }
                                onClick={() =>
                                    setDelivery(
                                        "pickup"
                                    )
                                }
                            >
                                <DeliveryLeft>
                                    <DeliveryIcon
                                        active={
                                            delivery ===
                                            "pickup"
                                        }
                                    >
                                        <MapPin
                                            size={18}
                                        />
                                    </DeliveryIcon>

                                    <DeliveryInfo>
                                        <DeliveryTitle>
                                            Самовивіз
                                        </DeliveryTitle>

                                        <DeliveryDescription>
                                            Безкоштовно
                                            з магазину
                                        </DeliveryDescription>
                                    </DeliveryInfo>
                                </DeliveryLeft>

                                {delivery ===
                                    "pickup" && (
                                        <CheckCircle>
                                            <Check
                                                size={
                                                    14
                                                }
                                            />
                                        </CheckCircle>
                                    )}
                            </DeliveryCard>
                        </DeliveryList>

                        {delivery === "nova" && (
                            <InputsGrid
                                style={{
                                    marginTop:
                                        18,
                                }}
                            >
                                <InputBlock>
                                    <Label>
                                        Місто
                                    </Label>

                                    <Input
                                        placeholder={
                                            "Запоріжжя"
                                        }
                                    />
                                </InputBlock>

                                <InputBlock>
                                    <Label>
                                        Відділення
                                    </Label>

                                    <Input
                                        placeholder={
                                            "№12"
                                        }
                                    />
                                </InputBlock>
                            </InputsGrid>
                        )}
                    </Section>

                    <Section>
                        <SectionTitle>
                            Оплата
                        </SectionTitle>

                        <PaymentCard>
                            <PaymentLeft>
                                <PaymentIcon>
                                    <CreditCard
                                        size={
                                            18
                                        }
                                    />
                                </PaymentIcon>

                                <PaymentInfo>
                                    <PaymentTitle>
                                        Оплата при
                                        отриманні
                                    </PaymentTitle>

                                    <PaymentDescription>
                                        Ви зможете
                                        оплатити
                                        товар після
                                        отримання
                                    </PaymentDescription>
                                </PaymentInfo>
                            </PaymentLeft>

                            <CheckCircle>
                                <Check
                                    size={14}
                                />
                            </CheckCircle>
                        </PaymentCard>
                    </Section>
                </Left>

                <Right>
                    <SummaryCard>
                        <SummaryHeader>
                            <SummaryTitle>
                                Ваше замовлення
                            </SummaryTitle>

                            <SummaryCount>
                                {PRODUCTS.length}{" "}
                                товари
                            </SummaryCount>
                        </SummaryHeader>

                        <Products>
                            {PRODUCTS.map(
                                product => (
                                    <ProductCard
                                        key={
                                            product.id
                                        }
                                    >
                                        <ProductImage
                                            src={
                                                product.image
                                            }
                                            alt={
                                                product.title
                                            }
                                        />

                                        <ProductInfo>
                                            <ProductTitle>
                                                {
                                                    product.title
                                                }
                                            </ProductTitle>

                                            <ProductMeta>
                                                {
                                                    product.count
                                                }{" "}
                                                ×{" "}
                                                {product.price.toLocaleString()} ₴
                                            </ProductMeta>
                                        </ProductInfo>

                                        <ProductPrice>
                                            {(
                                                product.price *
                                                product.count
                                            ).toLocaleString()} ₴
                                        </ProductPrice>
                                    </ProductCard>
                                )
                            )}
                        </Products>

                        <Divider />

                        <PriceRow>
                            <PriceLabel>
                                Товари
                            </PriceLabel>

                            <PriceValue>
                                {total.toLocaleString()} ₴
                            </PriceValue>
                        </PriceRow>

                        <PriceRow>
                            <PriceLabel>
                                Доставка
                            </PriceLabel>

                            <PriceValue>
                                {delivery ===
                                "nova"
                                    ? `${DELIVERY_PRICE} ₴`
                                    : "Безкоштовно"}
                            </PriceValue>
                        </PriceRow>

                        <Divider />

                        <TotalRow>
                            <TotalLabel>
                                До сплати
                            </TotalLabel>

                            <TotalValue>
                                {finalPrice.toLocaleString()} ₴
                            </TotalValue>
                        </TotalRow>

                        <CheckoutButton>
                            Підтвердити
                            замовлення

                            <ChevronRight
                                size={18}
                            />
                        </CheckoutButton>

                        <BottomInfo>
                            Натискаючи кнопку,
                            ви підтверджуєте
                            оформлення замовлення
                        </BottomInfo>
                    </SummaryCard>
                </Right>
            </Content>
        </Container>
    );
};

export default CheckoutPage;

const Container = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;

    padding: 28px;

    box-sizing: border-box;
`;

const Content = styled.div`
    width: 100%;
    max-width: 1480px;

    display: grid;

    grid-template-columns: 1.4fr 0.8fr;

    gap: 24px;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const Right = styled.div`
    position: sticky;

    top: 24px;

    height: fit-content;
`;

const Section = styled.div`
    padding: 24px;

    border-radius: 28px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 12px 28px rgba(15,23,42,0.04);
`;

const SectionTitle = styled.div`
    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const InputsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;

    margin-top: 22px;
`;

const InputBlock = styled.div<{ full?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    grid-column: ${({ full }) =>
    full ? "1 / -1" : "auto"};
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const Input = styled.input`
    width: 100%;

    height: 52px;

    padding: 0 16px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;

    box-sizing: border-box;

    &:focus {
        background: white;

        border-color: #94a3b8;
    }
`;

const DeliveryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const DeliveryCard = styled.div<{ active?: boolean }>`
    min-height: 92px;

    padding: 18px;

    border-radius: 22px;

    background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.08)"
        : "#f8fafc"};

    border: 1px solid ${({ active }) =>
    active
        ? "rgba(34,197,94,0.20)"
        : "#edf2f7"};

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    box-sizing: border-box;

    transition: 0.16s ease;
`;

const DeliveryLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const DeliveryIcon = styled.div<{ active?: boolean }>`
    width: 54px;
    height: 54px;

    border-radius: 18px;

    background: ${({ active }) =>
    active
        ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
        : "white"};

    color: ${({ active }) =>
    active ? "white" : "#0f172a"};

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeliveryInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeliveryTitle = styled.div`
    font-size: 16px;
    font-weight: 800;

    color: #0f172a;
`;

const DeliveryDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;

    border-radius: 999px;

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

const PaymentCard = styled.div`
    min-height: 92px;

    margin-top: 22px;

    padding: 18px;

    border-radius: 22px;

    background: rgba(34,197,94,0.08);

    border: 1px solid rgba(34,197,94,0.20);

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const PaymentLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const PaymentIcon = styled.div`
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
`;

const PaymentInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const PaymentTitle = styled.div`
    font-size: 16px;
    font-weight: 800;

    color: #0f172a;
`;

const PaymentDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;

const SummaryCard = styled.div`
    padding: 24px;

    border-radius: 28px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 12px 28px rgba(15,23,42,0.04);
`;

const SummaryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SummaryTitle = styled.div`
    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const SummaryCount = styled.div`
    height: 34px;

    padding: 0 14px;

    border-radius: 999px;

    background: rgba(34,197,94,0.10);

    color: #16a34a;

    display: flex;
    align-items: center;

    font-size: 13px;
    font-weight: 800;
`;

const Products = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 24px;
`;

const ProductCard = styled.div`
    display: flex;
    gap: 14px;
`;

const ProductImage = styled.img`
    width: 82px;
    height: 82px;

    border-radius: 18px;

    object-fit: cover;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ProductInfo = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.div`
    font-size: 14px;
    font-weight: 800;

    line-height: 1.6;

    color: #0f172a;
`;

const ProductMeta = styled.div`
    margin-top: 8px;

    font-size: 12px;

    color: #64748b;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    font-weight: 900;

    color: #16a34a;
`;

const Divider = styled.div`
    height: 1px;

    margin: 22px 0;

    background: #edf2f7;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 14px;
`;

const PriceLabel = styled.div`
    font-size: 14px;

    color: #64748b;
`;

const PriceValue = styled.div`
    font-size: 15px;
    font-weight: 800;

    color: #0f172a;
`;

const TotalRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TotalLabel = styled.div`
    font-size: 16px;
    font-weight: 700;

    color: #0f172a;
`;

const TotalValue = styled.div`
    font-size: 34px;
    font-weight: 900;

    letter-spacing: -0.06em;

    color: #16a34a;
`;

const CheckoutButton = styled.button`
    width: 100%;

    height: 58px;

    margin-top: 24px;

    border: none;
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
    gap: 10px;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 18px 30px rgba(34,197,94,0.24);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const BottomInfo = styled.div`
    margin-top: 14px;

    text-align: center;

    font-size: 12px;
    line-height: 1.7;

    color: #94a3b8;
`;