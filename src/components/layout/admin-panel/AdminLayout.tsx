import {type FC, type ReactNode, useState} from "react";
import styled from "styled-components";
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Users,
    Wrench,
    FolderTree,
    Globe,
} from "lucide-react";
import myIcon from "/logo-transparent3.png";
import {useNavigate} from "react-router-dom";

interface Props {
    children?: ReactNode;
}

const AdminLayout: FC<Props> = ({
                                    children,
                                }) => {
    const [collapsed, setCollapsed] = useState(false);
    const routes = location.pathname.split("/").slice(2);
    const navigate = useNavigate();

    return (
        <Container>
            <Sidebar collapsed={collapsed}>
                <SidebarTop>
                    {!collapsed && (
                        <>
                            <LogoWrapper>
                                <Logo src={myIcon} alt={"TechPanda"} />
                            </LogoWrapper>
                            <LogoText>TechPanda</LogoText>
                        </>
                    )}

                    <CollapseButton
                        onClick={() =>
                            setCollapsed(prev => !prev)
                        }
                    >
                        {collapsed
                            ? <ChevronRight size={16} />
                            : <ChevronLeft size={16} />
                        }
                    </CollapseButton>
                </SidebarTop>

                <SidebarContent>
                    <NavGroup>
                        <NavTitle collapsed={collapsed}>
                            Основне
                        </NavTitle>

                        <NavItem active={routes[0] === "dashboard"} onClick={() => navigate("/control/dashboard")}>
                            <LayoutDashboard size={18} />

                            {!collapsed && (
                                <span>
                                    Дашборд
                                </span>
                            )}
                        </NavItem>

                        <NavItem active={routes[0] === "orders"} onClick={() => navigate("/control/orders")}>
                            <ShoppingCart size={18} />

                            {!collapsed && (
                                <span>
                                    Замовлення
                                </span>
                            )}
                        </NavItem>

                        <NavItem active={routes[0] === "repair"} onClick={() => navigate("/control/repair")}>
                            <Wrench size={18} />

                            {!collapsed && (
                                <span>
                                    Ремонти
                                </span>
                            )}
                        </NavItem>
                    </NavGroup>

                    <NavGroup>
                        <NavTitle collapsed={collapsed}>
                            Магазин
                        </NavTitle>

                        <NavItem active={routes[0] === "products"} onClick={() => navigate("/control/products")}>
                            <Package size={18} />

                            {!collapsed && (
                                <span>
                                    Товари
                                </span>
                            )}
                        </NavItem>

                        <NavItem active={routes[0] === "categories"} onClick={() => navigate("/control/categories")}>
                            <FolderTree size={18} />

                            {!collapsed && (
                                <span>
                                    Категорії
                                </span>
                            )}
                        </NavItem>

                        <NavItem active={routes[0] === "users"} onClick={() => navigate("/control/users")}>
                            <Users size={18} />

                            {!collapsed && (
                                <span>
                                    Користувачі
                                </span>
                            )}
                        </NavItem>
                    </NavGroup>
                </SidebarContent>
            </Sidebar>

            <Right>
                <TopBar>
                    <TopLeft>
                        <PageTitle>
                            Адмін панель
                        </PageTitle>
                    </TopLeft>

                    <TopRight>
                        <SiteButton onClick={() => navigate("/products")}>
                            <Globe size={16} />

                            Відкрити сайт
                        </SiteButton>

                        <NotificationButton>
                            <Bell size={17} />

                            <NotificationDot />
                        </NotificationButton>

                        <Profile>
                            <Avatar>
                                A
                            </Avatar>

                            <ProfileInfo>
                                <ProfileName>
                                    Адміністратор
                                </ProfileName>

                                <ProfileRole>
                                    TechPanda Admin
                                </ProfileRole>
                            </ProfileInfo>
                        </Profile>
                    </TopRight>
                </TopBar>

                <Content>
                    {children}
                </Content>
            </Right>
        </Container>
    );
};

export default AdminLayout;

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;

    overflow: hidden;

    background: #f8fafc;
`;

const Sidebar = styled.div<{ collapsed: boolean }>`
    width: ${({ collapsed }) =>
    collapsed ? "84px" : "280px"};

    min-width: ${({ collapsed }) =>
    collapsed ? "84px" : "280px"};

    height: 100%;

    background:
            linear-gradient(
                    180deg,
                    #111827 0%,
                    #0f172a 100%
            );

    border-right: 1px solid rgba(255,255,255,0.06);

    display: flex;
    flex-direction: column;

    transition: 0.22s ease;

    overflow: hidden;
`;

const SidebarTop = styled.div`
    height: 82px;

    padding: 0 18px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid rgba(255,255,255,0.06);

    box-sizing: border-box;
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

const LogoText = styled.div`
    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: white;
`;

const CollapseButton = styled.button`
    width: 38px;
    height: 38px;

    border-radius: 12px;

    border: 1px solid rgba(255,255,255,0.08);

    background: rgba(255,255,255,0.04);

    color: rgba(255,255,255,0.84);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: rgba(255,255,255,0.08);
    }
`;

const SidebarContent = styled.div`
    flex: 1;

    overflow-y: auto;

    padding: 18px;

    box-sizing: border-box;
`;

const NavGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    margin-bottom: 28px;
`;

const NavTitle = styled.div<{ collapsed: boolean }>`
    padding: 0 12px;

    margin-bottom: 8px;

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 0.08em;
    text-transform: uppercase;

    color: rgba(255,255,255,0.34);

    opacity: ${({ collapsed }) =>
    collapsed ? 0 : 1};

    transition: 0.18s ease;
`;

const NavItem = styled.button<{ active?: boolean }>`
    width: 100%;
    height: 48px;

    padding: 0 14px;

    border: none;
    border-radius: 14px;

    background: ${({ active }) =>
    active
        ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
        : "transparent"};

    color: ${({ active }) =>
    active
        ? "white"
        : "rgba(255,255,255,0.84)"};

    display: flex;
    align-items: center;
    gap: 14px;

    font-size: 14px;
    font-weight: ${({ active }) =>
    active ? 800 : 700};

    cursor: pointer;

    transition: 0.16s ease;

    white-space: nowrap;

    overflow: hidden;

    box-shadow: ${({ active }) =>
    active
        ? "0 12px 24px rgba(34,197,94,0.20)"
        : "none"};

    &:hover {
        background: ${({ active }) =>
    active
        ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
        : "rgba(255,255,255,0.06)"};
    }
`;

const Right = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;

    min-width: 0;
`;

const TopBar = styled.div`
    height: 82px;

    padding: 0 24px;

    background: rgba(255,255,255,0.84);

    backdrop-filter: blur(12px);

    border-bottom: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;
`;

const TopLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    min-width: 0;
`;

const PageTitle = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;

    white-space: nowrap;
`;

const TopRight = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const SiteButton = styled.button`
    height: 44px;

    padding: 0 18px;

    border-radius: 14px;

    border: 1px solid #e2e8f0;

    background: white;

    color: #0f172a;

    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);

        box-shadow:
                0 10px 20px rgba(15,23,42,0.06);
    }
`;

const NotificationButton = styled.button`
    position: relative;

    width: 44px;
    height: 44px;

    border-radius: 14px;

    border: 1px solid #e2e8f0;

    background: white;

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const NotificationDot = styled.div`
    position: absolute;

    top: 10px;
    right: 10px;

    width: 8px;
    height: 8px;

    border-radius: 999px;

    background: #ef4444;
`;

const Profile = styled.div`
    height: 50px;

    padding: 0 16px;

    border-radius: 16px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 12px;

    box-shadow:
            0 8px 18px rgba(15,23,42,0.04);
`;

const Avatar = styled.div`
    width: 36px;
    height: 36px;

    border-radius: 12px;

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

    font-size: 14px;
    font-weight: 900;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileName = styled.div`
    font-size: 13px;
    font-weight: 800;

    color: #0f172a;
`;

const ProfileRole = styled.div`
    margin-top: 2px;

    font-size: 11px;
    font-weight: 600;

    color: #64748b;
`;

const Content = styled.div`
    flex: 1;

    overflow-y: auto;

    padding: 22px;

    box-sizing: border-box;
`;