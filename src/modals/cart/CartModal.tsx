import {type FC, useMemo} from "react";
import styled from "styled-components";
import {ShoppingBag, X,} from "lucide-react";
import {useNavigate} from "react-router-dom";
import useCart from "@hooks/useCart.tsx";
import useProductsList from "@hooks/useProductsList.tsx";
import CartProduct from "./src/CartProduct.tsx";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

interface Props {
    open: boolean;
    onClose: () => void;
}

const CartModal: FC<Props> = (props) => {
    const {open, onClose,} = props;
    const navigate = useNavigate();
    const cart = useCart();

    const filters = useMemo(
        () => ({ids: cart.cartIds}),
        [cart.cartIds]
    );

    const {list} = useProductsList(filters);

    const totalPrice = useMemo(
        () => list.reduce(
            (sum, i) => (
                sum + (buildProductPrice(i) * cart.getCartCount(i.id))
            ), 0),
        [cart, list]
    );

    return (
        <Overlay open={open}>
            <Modal>
                <Header>
                    <HeaderLeft>
                        <HeaderIcon>
                            <ShoppingBag size={18}/>
                        </HeaderIcon>

                        <HeaderInfo>
                            <Title>Кошик</Title>
                            <Description>
                                {cart.cart.length} товарів у кошику
                            </Description>
                        </HeaderInfo>
                    </HeaderLeft>

                    <CloseButton onClick={onClose}>
                        <X size={18}/>
                    </CloseButton>
                </Header>

                <Content>
                    <Products>
                        {cart.cart.length > 0 && list.map(product => (
                            <CartProduct product={product} key={product.id}/>
                        ))}
                    </Products>

                    <Footer>
                        <Summary>
                            <SummaryLabel>
                                Загальна сума
                            </SummaryLabel>

                            <SummaryPrice>
                                {buildNumberFormat(totalPrice)} ₴
                            </SummaryPrice>
                        </Summary>

                        <Buttons>
                            <ClearButton onClick={() => {
                                onClose();
                                cart.clearCart();
                            }}>
                                Очистити
                            </ClearButton>

                            <CheckoutButton onClick={() => {
                                if (cart.cart.length === 0) return;
                                onClose();
                                navigate("/checkout");
                            }} $disabled={cart.cart.length === 0} >
                                Оформити замовлення
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

    background: rgba(15, 23, 42, 0.32);

    backdrop-filter: blur(5px);

    opacity: ${({open}) => open ? 1 : 0};

    pointer-events: ${({open}) =>
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

    box-shadow: -20px 0 40px rgba(15, 23, 42, 0.12);

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

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 12px 24px rgba(34, 197, 94, 0.20);
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

const CheckoutButton = styled.button<{$disabled?: boolean}>`
    flex: 2;

    height: 52px;

    border: none;
    border-radius: 16px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow: 0 14px 28px rgba(34, 197, 94, 0.22);
    
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