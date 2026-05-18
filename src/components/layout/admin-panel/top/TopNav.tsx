import { type FC } from 'react';
import styled from "styled-components";
import {IconTile} from "@atlaskit/icon";
import myIcon from "/logo-transparent3.png"

interface Props {
    // todo
}

const TopNav: FC<Props> = () => {
    return (
        <Container>
            {/*<IconButton icon={MenuIcon} label={""} />*/}
            <HeaderLeft>
                <IconTile
                    icon={(props) => (
                        <img
                            src={myIcon}
                            alt="icon"
                            width={28}
                            height={28}
                            style={{
                                objectFit: "contain",
                                display: "block",
                            }}
                            {...props}
                        />
                    )}
                    label="Моя иконка"
                    size={"32"}
                    appearance="blue"
                />
                <Title>TechPanda</Title>
            </HeaderLeft>
        </Container>
    );
};

export default TopNav;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    height: 60px;
    background-color: #F3F6F9;
    border-bottom: 1px solid #E2E8F0;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    font-family: var(--font-logo);
`