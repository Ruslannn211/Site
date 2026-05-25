import {type FC, useMemo} from "react";
import styled from "styled-components";
import {ChevronRight,} from "lucide-react";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import ProductItem from "@pages/checkout/src/ProductItem.tsx";
import {buildProductPrice} from "@helpers/buildProductPrice.ts";
import type {FormCheckoutType} from "@pages/checkout/CheckoutPage.tsx";
import type {ProductListType} from "@types-lib";
import useCart from "@hooks/useCart.tsx";
import Spinner from "@components/ui/Spinner.tsx";
import useCreateOrder from "@hooks/useCreateOrder.tsx";
import {useNavigate} from "react-router-dom";

interface Props {
    form: FormCheckoutType;
    list: ProductListType[];
}

const RightForm: FC<Props> = (props) => {
    const {list, form} = props;
    const cart = useCart();
    const {handle: createOrder, loading} = useCreateOrder();
    const navigate = useNavigate();

    const total = useMemo(() => {
        return list.reduce((acc, product) => {
                const count = cart.getCartCount(product.id);
                return acc + buildProductPrice(product) * count;
            }, 0
        );
    }, [cart.getCartCount, list]);

    const totalNonDiscount = useMemo(() => {
        return list.reduce((acc, product) => {
                const count = cart.getCartCount(product.id);
                return acc + product.price * count;
            }, 0
        );
    }, [cart.getCartCount, list]);

    const isActive = form.client_name.trim().length > 0 && form.phone_number.length > 0 && form.email.length > 0;

    async function submit() {
        const response = await createOrder({...form, products: cart.cart});
        if (response) {
            navigate("/");
            cart.clearCart();
        }
    }

    return (
        <Right>
            <SummaryCard>
                <SummaryHeader>
                    <SummaryTitle>Ваше замовлення</SummaryTitle>
                    <SummaryCount>{list.length}{" "}товари</SummaryCount>
                </SummaryHeader>

                <Products>
                    {list.map(product => <ProductItem key={product.id} product={product} />)}
                </Products>

                <Divider />

                <PriceRow>
                    <PriceLabel>Товари</PriceLabel>
                    <PriceValue>{buildNumberFormat(total)} ₴</PriceValue>
                </PriceRow>

                <PriceRow>
                    <PriceLabel>Сума знижки</PriceLabel>
                    <PriceValue>{buildNumberFormat(totalNonDiscount - total)} ₴</PriceValue>
                </PriceRow>

                <PriceRow>
                    <PriceLabel>Доставка</PriceLabel>
                    <PriceValue>
                        {form.delivery === "nova" ? `Тариф перевізника` : "Безкоштовно"}
                    </PriceValue>
                </PriceRow>

                <Divider />

                <TotalRow>
                    <TotalLabel>До сплати</TotalLabel>
                    <TotalValue>{buildNumberFormat(total)} ₴</TotalValue>
                </TotalRow>

                <CheckoutButton disabled={!isActive || loading} onClick={submit}>
                    {loading ? (<><Spinner />Надсилаємо замовлення...</>) : ("Підтвердити замовлення")}
                    <ChevronRight size={18}/>
                </CheckoutButton>

                <BottomInfo>
                    Натискаючи кнопку, ви підтверджуєте оформлення замовлення
                </BottomInfo>
            </SummaryCard>
        </Right>
    );
};

export default RightForm;

const Right = styled.div`
    position: sticky;

    top: 24px;

    height: fit-content;
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

    background: linear-gradient(
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

    box-shadow: 0 18px 30px rgba(34, 197, 94, 0.24);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }

    ${p => p.disabled && `
        cursor: not-allowed;
        box-shadow: none;
        background: linear-gradient(
                135deg,#969f98 0%,#bdc9c2 100%
        );
        
        &:hover {
            transform: none;
        }
    `}
`;

const BottomInfo = styled.div`
    margin-top: 14px;

    text-align: center;

    font-size: 12px;
    line-height: 1.7;

    color: #94a3b8;
`;