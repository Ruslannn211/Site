import {type FC} from "react";
import styled from "styled-components";
import {
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    X,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface Props {
    open: boolean;
    onClose?: () => void;
}

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

const CartModal: FC<Props> = ({
                                  open,
                                  onClose,
                              }) => {
    const total = PRODUCTS.reduce(
        (acc, product) =>
            acc +
            product.price * product.count,
        0
    );
    const navigate = useNavigate();

    return (
        <Overlay open={open}>
            <Modal>
                <Header>
                    <HeaderLeft>
                        <HeaderIcon>
                            <ShoppingBag size={18} />
                        </HeaderIcon>

                        <HeaderInfo>
                            <Title>
                                Кошик
                            </Title>

                            <Description>
                                {PRODUCTS.length} товарів
                                у кошику
                            </Description>
                        </HeaderInfo>
                    </HeaderLeft>

                    <CloseButton
                        onClick={onClose}
                    >
                        <X size={18} />
                    </CloseButton>
                </Header>

                <Content>
                    <Products>
                        {PRODUCTS.map(product => (
                            <ProductCard
                                key={product.id}
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

                                    <Controls>
                                        <FlexContainer>
                                            <CountControls>
                                                <CountButton>
                                                    <Minus
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </CountButton>

                                                <Count>
                                                    {
                                                        product.count
                                                    }
                                                </Count>

                                                <CountButton>
                                                    <Plus
                                                        size={
                                                            14
                                                        }
                                                    />
                                                </CountButton>
                                            </CountControls>
                                            <ProductPrice>
                                                {product.price.toLocaleString()} ₴
                                            </ProductPrice>
                                        </FlexContainer>

                                        <DeleteButton>
                                            <Trash2
                                                size={
                                                    15
                                                }
                                            />
                                        </DeleteButton>
                                    </Controls>
                                </ProductInfo>
                            </ProductCard>
                        ))}
                    </Products>

                    <Footer>
                        <Summary>
                            <SummaryLabel>
                                Загальна сума
                            </SummaryLabel>

                            <SummaryPrice>
                                {total.toLocaleString()} ₴
                            </SummaryPrice>
                        </Summary>

                        <Buttons>
                            <ClearButton>
                                Очистити
                            </ClearButton>

                            <CheckoutButton onClick={() => {
                                if (onClose) onClose();
                                navigate("/checkout");
                            }}>
                                Оформити
                                замовлення
                            </CheckoutButton>
                        </Buttons>
                    </Footer>
                </Content>
            </Modal>
        </Overlay>
    );
};

export default CartModal;

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 600;

    display: flex;
    justify-content: flex-end;

    background: rgba(15,23,42,0.32);

    backdrop-filter: blur(5px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 520px;

    height: 100vh;

    background: white;

    border-left: 1px solid #e2e8f0;

    display: flex;
    flex-direction: column;

    box-shadow:
            -20px 0 40px rgba(15,23,42,0.12);

    animation: slideIn 0.22s ease;

    @keyframes slideIn {
        from {
            transform: translateX(40px);
        }

        to {
            transform: translateX(0);
        }
    }
`;

const Header = styled.div`
    min-height: 86px;

    padding: 0 24px;

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const HeaderIcon = styled.div`
    width: 48px;
    height: 48px;

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

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 26px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 4px;

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

    display: flex;
    flex-direction: column;

    min-height: 0;
`;

const Products = styled.div`
    flex: 1;

    overflow-y: auto;

    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    box-sizing: border-box;
`;

const ProductCard = styled.div`
    display: flex;
    gap: 16px;

    padding: 14px;

    border-radius: 8px;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ProductImage = styled.img`
    width: 70px;
    height: 70px;

    border-radius: 18px;

    object-fit: cover;

    background: white;
`;

const ProductInfo = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`;

const ProductTitle = styled.div`
    font-size: 15px;
    font-weight: 800;

    line-height: 1.5;

    color: #0f172a;
`;

const ProductPrice = styled.div`

    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CountControls = styled.div`
    height: 42px;

    padding: 0 10px;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 12px;
`;

const CountButton = styled.button`
    width: 26px;
    height: 26px;

    border-radius: 8px;

    border: none;

    background: #f1f5f9;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Count = styled.div`
    min-width: 24px;

    text-align: center;

    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const DeleteButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    border: none;

    background: rgba(239,68,68,0.10);

    color: #ef4444;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Footer = styled.div`
    padding: 22px;

    border-top: 1px solid #edf2f7;

    background: white;

    box-sizing: border-box;
`;

const Summary = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SummaryLabel = styled.div`
    font-size: 15px;
    font-weight: 700;

    color: #64748b;
`;

const SummaryPrice = styled.div`
    font-size: 32px;
    font-weight: 900;

    letter-spacing: -0.06em;

    color: #16a34a;
`;

const Buttons = styled.div`
    display: flex;
    gap: 12px;

    margin-top: 20px;
`;

const ClearButton = styled.button`
    flex: 1;

    height: 52px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: white;

    color: #0f172a;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;
`;

const CheckoutButton = styled.button`
    flex: 2;

    height: 52px;

    border: none;
    border-radius: 16px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 14px 28px rgba(34,197,94,0.22);
`;