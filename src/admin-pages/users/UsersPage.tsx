import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    Crown,
    Mail,
    Pencil,
    Search,
    Shield,
    ShoppingCart,
    Trash2,
    User,
    UserCheck,
    Wrench,
} from "lucide-react";

type UserRole =
    | "user"
    | "admin";

interface SiteUser {
    id: number;
    avatar: string;
    name: string;
    email: string;
    role: UserRole;

    orders: number;
    repairs: number;
    totalSpent: number;

    createdAt: string;
}

const MOCK_USERS: SiteUser[] = [
    {
        id: 1,
        avatar:
            "https://i.pravatar.cc/300?img=1",
        name: "Іван Петренко",
        email: "ivan@gmail.com",
        role: "admin",

        orders: 18,
        repairs: 4,
        totalSpent: 124500,

        createdAt: "12.02.2026",
    },

    {
        id: 2,
        avatar:
            "https://i.pravatar.cc/300?img=2",
        name: "Марина Шевченко",
        email: "marina@gmail.com",
        role: "user",

        orders: 6,
        repairs: 1,
        totalSpent: 24800,

        createdAt: "04.03.2026",
    },

    {
        id: 3,
        avatar:
            "https://i.pravatar.cc/300?img=3",
        name: "Олександр Коваль",
        email: "alex@gmail.com",
        role: "user",

        orders: 14,
        repairs: 2,
        totalSpent: 68400,

        createdAt: "18.01.2026",
    },
];

const UsersPage: FC = () => {
    const [search, setSearch] = useState("");

    const [users, setUsers] =
        useState(MOCK_USERS);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            `${user.name} ${user.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, users]);

    const totalSpent = useMemo(() => {
        return users.reduce(
            (acc, user) =>
                acc + user.totalSpent,
            0
        );
    }, [users]);

    const toggleAdmin = (id: number) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? {
                        ...user,
                        role:
                            user.role ===
                            "admin"
                                ? "user"
                                : "admin",
                    }
                    : user
            )
        );
    };

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>
                        Користувачі
                    </PageTitle>

                    <PageDescription>
                        Управління користувачами
                        сайту та правами доступу
                    </PageDescription>
                </TopLeft>

                <TopRight>
                    <SearchBlock>
                        <Search size={16} />

                        <SearchInput
                            value={search}
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder={
                                "Пошук користувача..."
                            }
                        />
                    </SearchBlock>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCard>
                    <StatIcon>
                        <User size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {users.length}
                        </StatValue>

                        <StatLabel>
                            Всього користувачів
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Shield size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {
                                users.filter(
                                    user =>
                                        user.role ===
                                        "admin"
                                ).length
                            }
                        </StatValue>

                        <StatLabel>
                            Адміністраторів
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <ShoppingCart size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {users.reduce(
                                (
                                    acc,
                                    user
                                ) =>
                                    acc +
                                    user.orders,
                                0
                            )}
                        </StatValue>

                        <StatLabel>
                            Всього замовлень
                        </StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Crown size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {totalSpent.toLocaleString()} ₴
                        </StatValue>

                        <StatLabel>
                            Витрачено
                        </StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <UsersList>
                {filteredUsers.map(user => (
                    <UserCard key={user.id}>
                        <UserLeft>
                            <Avatar
                                src={user.avatar}
                                alt={user.name}
                            />

                            <UserInfo>
                                <UserNameRow>
                                    <UserName>
                                        {user.name}
                                    </UserName>

                                    {user.role ===
                                        "admin" && (
                                            <AdminBadge>
                                                <Shield
                                                    size={
                                                        12
                                                    }
                                                />

                                                Адмін
                                            </AdminBadge>
                                        )}
                                </UserNameRow>

                                <UserEmail>
                                    <Mail
                                        size={13}
                                    />

                                    {user.email}
                                </UserEmail>

                                <UserDate>
                                    Реєстрація:{" "}
                                    {
                                        user.createdAt
                                    }
                                </UserDate>
                            </UserInfo>
                        </UserLeft>

                        <UserCenter>
                            <MiniStat>
                                <MiniStatIcon>
                                    <ShoppingCart
                                        size={14}
                                    />
                                </MiniStatIcon>

                                <MiniStatInfo>
                                    <MiniStatValue>
                                        {
                                            user.orders
                                        }
                                    </MiniStatValue>

                                    <MiniStatLabel>
                                        Замовлень
                                    </MiniStatLabel>
                                </MiniStatInfo>
                            </MiniStat>

                            <MiniStat>
                                <MiniStatIcon>
                                    <Wrench
                                        size={14}
                                    />
                                </MiniStatIcon>

                                <MiniStatInfo>
                                    <MiniStatValue>
                                        {
                                            user.repairs
                                        }
                                    </MiniStatValue>

                                    <MiniStatLabel>
                                        Ремонтів
                                    </MiniStatLabel>
                                </MiniStatInfo>
                            </MiniStat>
                        </UserCenter>

                        <UserRight>
                            <SpentValue>
                                {user.totalSpent.toLocaleString()} ₴
                            </SpentValue>

                            <SpentLabel>
                                Загальні витрати
                            </SpentLabel>

                            <Actions>
                                <AdminButton
                                    admin={
                                        user.role ===
                                        "admin"
                                    }
                                    onClick={() =>
                                        toggleAdmin(
                                            user.id
                                        )
                                    }
                                >
                                    <UserCheck
                                        size={15}
                                    />

                                    {user.role ===
                                    "admin"
                                        ? "Забрати доступ"
                                        : "Дати доступ"}
                                </AdminButton>

                                <IconButton>
                                    <Pencil
                                        size={15}
                                    />
                                </IconButton>

                                <IconButton
                                    danger
                                >
                                    <Trash2
                                        size={15}
                                    />
                                </IconButton>
                            </Actions>
                        </UserRight>
                    </UserCard>
                ))}
            </UsersList>
        </Container>
    );
};

export default UsersPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const TopLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const PageTitle = styled.div`
    font-size: 34px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const PageDescription = styled.div`
    margin-top: 8px;

    font-size: 14px;

    color: #64748b;
`;

const TopRight = styled.div`
    display: flex;
    align-items: center;
`;

const SearchBlock = styled.div`
    width: 320px;
    height: 46px;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 0 14px;

    color: #94a3b8;

    box-sizing: border-box;
`;

const SearchInput = styled.input`
    flex: 1;

    border: none;
    outline: none;

    background: transparent;

    font-size: 14px;
`;

const StatsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 16px;
`;

const StatCard = styled.div`
    min-height: 110px;

    padding: 18px;

    border-radius: 20px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    gap: 16px;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const StatIcon = styled.div`
    width: 52px;
    height: 52px;

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
`;

const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatValue = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const StatLabel = styled.div`
    margin-top: 4px;

    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const UsersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const UserCard = styled.div`
    min-height: 122px;

    padding: 20px;

    border-radius: 24px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-shadow:
            0 10px 24px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const UserLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    flex: 1;

    min-width: 0;
`;

const Avatar = styled.img`
    width: 74px;
    height: 74px;

    border-radius: 22px;

    object-fit: cover;

    border: 1px solid #e2e8f0;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 0;
`;

const UserNameRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const UserName = styled.div`
    font-size: 20px;
    font-weight: 900;

    color: #0f172a;
`;

const AdminBadge = styled.div`
    height: 28px;

    padding: 0 10px;

    border-radius: 999px;

    background: rgba(34,197,94,0.10);

    color: #16a34a;

    display: flex;
    align-items: center;
    gap: 6px;

    font-size: 12px;
    font-weight: 800;
`;

const UserEmail = styled.div`
    margin-top: 8px;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;

    color: #475569;
`;

const UserDate = styled.div`
    margin-top: 8px;

    font-size: 12px;

    color: #94a3b8;
`;

const UserCenter = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const MiniStat = styled.div`
    min-width: 140px;

    padding: 14px;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    gap: 12px;
`;

const MiniStatIcon = styled.div`
    width: 40px;
    height: 40px;

    border-radius: 12px;

    background: white;

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MiniStatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const MiniStatValue = styled.div`
    font-size: 18px;
    font-weight: 900;

    color: #0f172a;
`;

const MiniStatLabel = styled.div`
    margin-top: 2px;

    font-size: 12px;

    color: #64748b;
`;

const UserRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const SpentValue = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const SpentLabel = styled.div`
    margin-top: 4px;

    font-size: 12px;

    color: #64748b;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 16px;
`;

const AdminButton = styled.button<{
    admin?: boolean;
}>`
    height: 42px;

    padding: 0 14px;

    border-radius: 14px;

    border: none;

    background: ${({ admin }) =>
    admin
        ? "rgba(239,68,68,0.10)"
        : "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"};

    color: ${({ admin }) =>
    admin ? "#ef4444" : "white"};

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 13px;
    font-weight: 800;

    cursor: pointer;
`;

const IconButton = styled.button<{
    danger?: boolean;
}>`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    border: 1px solid ${({ danger }) =>
    danger
        ? "rgba(239,68,68,0.14)"
        : "#e2e8f0"};

    background: ${({ danger }) =>
    danger
        ? "rgba(239,68,68,0.08)"
        : "white"};

    color: ${({ danger }) =>
    danger
        ? "#ef4444"
        : "#0f172a"};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;