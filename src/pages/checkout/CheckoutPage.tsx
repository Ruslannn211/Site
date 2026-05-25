import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import useCart from "@hooks/useCart.tsx";
import useProductsList from "@hooks/useProductsList.tsx";
import LeftForm from "@pages/checkout/src/LeftForm.tsx";
import RightForm from "@pages/checkout/src/RightForm.tsx";
import {useStore} from "@store";
import {buildClientName} from "@helpers/buildClientName.ts";

export type FormCheckoutType = {
    delivery: "nova" | "pickup";
    client_name: string;
    phone_number: string;
    email: string;
    post_office: string | null;
    post_city: string | null;
    payment_type: "upon-receipt" | "online";
}

const CheckoutPage: FC = () => {
    const {user} = useStore(store => store.global.user);

    const [form, setForm] = useState<FormCheckoutType>({
        delivery: "nova", client_name: user ? buildClientName(user) : "", email: user?.email ?? "",
        payment_type: "upon-receipt", phone_number: user?.phone_number ?? "", post_city: null, post_office: null
    });
    const cart = useCart();

    const filters = useMemo(() => ({ids: cart.cartIds}), [cart.cartIds]);
    const {list} = useProductsList(filters);

    return (
        <Container>
            <Content>
                <LeftForm formState={[form, setForm]} />
                <RightForm form={form} list={list} />
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