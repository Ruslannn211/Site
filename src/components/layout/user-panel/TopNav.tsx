import { type FC } from 'react';
import styled from "styled-components";
import myIcon from "/logo-transparent3.png";

import {
    Search,
    ShoppingCart,
    Heart,
    Menu,
    User,
    Wrench,
    Package, ShieldCheck,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface Props {
    openCart: () => void;
}

const TopNav: FC<Props> = (props) => {
    const routes = location.pathname.split("/").slice(1);
    const navigate = useNavigate();

    const handleViewType = (new_type: "products" | "repair") => {
        navigate("/" + new_type);
    }

    return (
        <Container>
            <Content>
                <Left>
                    <MenuButton>
                        <Menu size={20} />
                    </MenuButton>

                    <LogoWrapper>
                        <Logo src={myIcon} alt={"TechPanda"} />
                    </LogoWrapper>

                    <BrandBlock>
                        <Title>TechPanda</Title>

                        <Subtitle>
                            Tech & Repair Store
                        </Subtitle>
                    </BrandBlock>

                    <ModeSwitcher>
                        <ModeButton
                            active={routes[0] === "products"}
                            onClick={() => handleViewType("products")}
                        >
                            <Package size={15} />

                            Товари
                        </ModeButton>

                        <ModeButton
                            active={routes[0] === "repair"}
                            onClick={() => handleViewType("repair")}
                        >
                            <Wrench size={15} />

                            Ремонт
                        </ModeButton>
                    </ModeSwitcher>
                </Left>

                <SearchWrapper>
                    {routes[0] === "products" && (
                        <>
                            <SearchIcon>
                                <Search size={18} />
                            </SearchIcon>
                            <SearchInput placeholder={"Пошук товарів, комплектуючих..."}/>
                        </>
                    )}
                </SearchWrapper>

                <Right>
                    <NavIconButton>
                        <Heart size={19} />

                        <Badge>
                            2
                        </Badge>
                    </NavIconButton>

                    <NavIconButton onClick={props.openCart}>
                        <ShoppingCart size={19} />

                        <Badge>
                            3
                        </Badge>
                    </NavIconButton>

                    <ProfileButton>
                        <User size={17} />

                        Увійти
                    </ProfileButton>

                    <AdminButton onClick={() => navigate("/control")}>
                        <ShieldCheck size={17} />

                        Адмін панель
                    </AdminButton>
                </Right>
            </Content>
        </Container>
    );
};

export default TopNav;

const Container = styled.header`
    width: 100%;
    height: 72px;

    position: sticky;
    top: 0;

    z-index: 100;

    display: flex;
    justify-content: center;

    backdrop-filter: blur(16px);

    background:
            linear-gradient(
                    180deg,
                    rgba(255,255,255,0.94) 0%,
                    rgba(248,250,252,0.96) 100%
            );

    border-bottom: 1px solid #e2e8f0;

    box-shadow:
            0 1px 2px rgba(15,23,42,0.03),
            0 10px 30px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const Content = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    gap: 18px;

    padding: 0 18px;

    box-sizing: border-box;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    flex-shrink: 0;
`;

const MenuButton = styled.button`
    width: 40px;
    height: 40px;

    border: 1px solid #e2e8f0;
    border-radius: 10px;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.18s ease;

    box-shadow:
            0 4px 10px rgba(15,23,42,0.04);

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow:
                0 10px 18px rgba(15,23,42,0.08);
    }
`;

const LogoWrapper = styled.div`
    width: 46px;
    height: 46px;

    border-radius: 14px;

    background:
            linear-gradient(
                    135deg,
                    #ffffff 0%,
                    #f3f6fb 100%
            );

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    box-shadow:
            0 4px 12px rgba(15,23,42,0.05);

    box-sizing: border-box;
`;

const Logo = styled.img`
    width: 32px;
    height: 32px;

    object-fit: contain;
`;

const BrandBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    margin-right: 6px;
`;

const Title = styled.div`
    font-size: 23px;
    line-height: 1;

    font-weight: 800;

    letter-spacing: -0.04em;

    color: #0f172a;

    font-family: var(--font-logo);
`;

const Subtitle = styled.div`
    font-size: 10px;
    font-weight: 700;

    letter-spacing: 0.08em;
    text-transform: uppercase;

    color: #64748b;
`;

const ModeSwitcher = styled.div`
    height: 42px;

    padding: 4px;

    border-radius: 12px;

    background: #f1f5f9;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 4px;

    box-sizing: border-box;
`;

const ModeButton = styled.button<{ active: boolean }>`
    height: 100%;

    padding: 0 16px;

    border: none;
    border-radius: 9px;

    background: ${({ active }) =>
            active
                    ? "linear-gradient(135deg,#111827 0%,#1e293b 100%)"
                    : "transparent"};

    color: ${({ active }) =>
            active ? "white" : "#475569"};

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.18s ease;

    box-shadow: ${({ active }) =>
            active
                    ? "0 6px 14px rgba(15,23,42,0.16)"
                    : "none"};

    &:hover {
        color: ${({ active }) =>
                active ? "white" : "#0f172a"};
    }
`;

const SearchWrapper = styled.div`
    flex: 1;

    height: 42px;

    position: relative;

    display: flex;
    align-items: center;
`;

const SearchIcon = styled.div`
    position: absolute;

    left: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #64748b;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;

    padding: 0 18px 0 46px;

    border-radius: 10px;

    border: 1px solid #e2e8f0;

    outline: none;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    font-size: 14px;
    font-weight: 500;

    color: #0f172a;

    transition: 0.18s ease;

    box-sizing: border-box;

    box-shadow:
            inset 0 1px 2px rgba(15,23,42,0.03);

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        border-color: #94a3b8;

        box-shadow:
                0 0 0 4px rgba(148,163,184,0.10),
                inset 0 1px 2px rgba(15,23,42,0.03);
    }
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    flex-shrink: 0;
`;

const NavIconButton = styled.button`
    width: 40px;
    height: 40px;

    position: relative;

    border: 1px solid #e2e8f0;
    border-radius: 10px;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.18s ease;

    box-shadow:
            0 4px 10px rgba(15,23,42,0.04);

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow:
                0 10px 18px rgba(15,23,42,0.08);
    }
`;

const Badge = styled.div`
    position: absolute;

    top: -4px;
    right: -4px;

    min-width: 16px;
    height: 16px;

    padding: 0 5px;

    border-radius: 999px;

    background: #ef4444;

    color: white;

    font-size: 10px;
    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid white;

    box-sizing: border-box;
`;

const ProfileButton = styled.button`
    height: 40px;

    padding: 0 16px;

    border-radius: 10px;

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

    transition: 0.18s ease;

    box-shadow:
            0 4px 10px rgba(15,23,42,0.04);

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow:
                0 10px 18px rgba(15,23,42,0.08);
    }
`;

const AdminButton = styled.button`
    height: 40px;

    padding: 0 16px;

    border-radius: 10px;

    border: 1px solid rgba(255,255,255,0.08);

    background:
            linear-gradient(
                    135deg,
                    #111827 0%,
                    #1f2937 100%
            );

    color: white;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.18s ease;

    box-shadow:
            0 8px 18px rgba(15,23,42,0.14);

    &:hover {
        transform: translateY(-1px);

        background:
                linear-gradient(
                        135deg,
                        #0f172a 0%,
                        #111827 100%
                );

        box-shadow:
                0 14px 24px rgba(15,23,42,0.20);
    }

    &:active {
        transform: translateY(0);
    }
`;