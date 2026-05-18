import { type FC, type ReactNode } from 'react';
import styled from "styled-components";
import TopNav from "./TopNav.tsx";

interface Props {
    children: ReactNode;
}

const UserLayout: FC<Props> = (props) => {
    return (
        <Container>
            <TopNav />

            <ContentContainer>
                {props.children}
            </ContentContainer>
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