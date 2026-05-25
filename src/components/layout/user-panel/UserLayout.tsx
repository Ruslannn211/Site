import {type FC, type ReactNode, useState} from 'react';
import styled from "styled-components";
import TopNav from "./TopNav.tsx";
import CartModal from "../../../modals/cart/CartModal.tsx";
import AuthModal from "../../../modals/auth/AuthModal.tsx";
import FavoriteModal from "../../../modals/favorite/FavoriteModal.tsx";

interface Props {
    children: ReactNode;
}

const UserLayout: FC<Props> = (props) => {
    const [auth, setAuth] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [cart, setCart] = useState(false);

    return (
        <Container>
            <TopNav openCart={() => setCart(true)}
                    openAuth={() => setAuth(true)}
                    openFavorite={() => setFavorite(true)}
            />

            <ContentContainer>
                {props.children}
            </ContentContainer>
            <FavoriteModal open={favorite} onClose={() => setFavorite(false)} />
            <CartModal open={cart} onClose={() => setCart(false)} />
            <AuthModal open={auth} onClose={() => setAuth(false)} />
        </Container>
    );
};

export default UserLayout;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;

    overflow: hidden;
`;

const ContentContainer = styled.div`
    flex: 1;

    position: relative;

    overflow-y: auto;

    display: flex;
    flex-direction: column;
`;