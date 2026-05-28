import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {Crown, Search, Shield, ShoppingCart, User,} from "lucide-react";
import UserItem from "@admin-pages/users/src/UserItem.tsx";
import useUsersList from "@hooks/useUsersList.tsx";
import {buildClientName} from "@helpers/buildClientName.ts";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";

const UsersPage: FC = () => {
    const [search, setSearch] = useState("");

    const {list: users, changeAdmin} = useUsersList();

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            `${buildClientName(user)} ${user.email} ${user.phone_number}`
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

    return (
        <Container>
            <TopBar>
                <TopLeft>
                    <PageTitle>Користувачі</PageTitle>
                    <PageDescription>
                        Управління користувачами сайту та правами доступу
                    </PageDescription>
                </TopLeft>

                <TopRight>
                    <SearchBlock>
                        <Search size={16} />
                        <SearchInput
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={"Пошук користувача..."}
                        />
                    </SearchBlock>
                </TopRight>
            </TopBar>

            <StatsGrid>
                <StatCard>
                    <StatIcon><User size={18} /></StatIcon>
                    <StatInfo>
                        <StatValue>{buildNumberFormat(users.length)}</StatValue>

                        <StatLabel>Всього користувачів</StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Shield size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {users.filter(user => user.isAdmin).length}
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
                            {users.reduce((acc, user) => acc + user.ordersCount, 0)}
                        </StatValue>
                        <StatLabel>Всього замовлень</StatLabel>
                    </StatInfo>
                </StatCard>

                <StatCard>
                    <StatIcon>
                        <Crown size={18} />
                    </StatIcon>

                    <StatInfo>
                        <StatValue>
                            {buildNumberFormat(totalSpent)} ₴
                        </StatValue>

                        <StatLabel>Витрачено</StatLabel>
                    </StatInfo>
                </StatCard>
            </StatsGrid>

            <UsersList>
                {filteredUsers.map(user => (
                    <UserItem user={user} changeAdmin={changeAdmin} />
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