import {type FC} from "react";
import styled from "styled-components";
import {
    Mail, Shield, ShoppingCart,
    UserCheck, Wrench,
} from "lucide-react";
import type {UserListType} from "@types-lib";
import {buildClientName} from "@helpers/buildClientName.ts";
import {buildFormatDateTime} from "@helpers/buildFormatDateTime.ts";
import {buildNumberFormat} from "@helpers/buildNumberFormat.ts";
import useUserAdmin from "@hooks/useUserAdmin.tsx";

interface Props {
    user: UserListType;
    changeAdmin: (id: number, isAdmin: boolean) => void;
}

const UserItem: FC<Props> = (props) => {
    const {user, changeAdmin} = props;
    const {handle} = useUserAdmin(user.id);

    const toggleAdmin = () => {
        handle(!user.isAdmin);
        changeAdmin(user.id, !user.isAdmin);
    };

    return (
        <UserCard key={user.id}>
            <UserLeft>
                <Avatar>
                    {user.first_name[0]}
                </Avatar>

                <UserInfo>
                    <UserNameRow>
                        <UserName>{buildClientName(user)}</UserName>

                        {user.isAdmin && (
                                <AdminBadge>
                                    <Shield size={12}/>
                                    Адмін
                                </AdminBadge>
                            )
                        }
                    </UserNameRow>

                    <UserEmail>
                        <Mail size={13}/>
                        {user.email}
                    </UserEmail>

                    <UserDate>
                        Реєстрація:{" "}{buildFormatDateTime(user.createdAt)}
                    </UserDate>
                </UserInfo>
            </UserLeft>

            <UserCenter>
                <MiniStat>
                    <MiniStatIcon>
                        <ShoppingCart size={14}/>
                    </MiniStatIcon>
                    <MiniStatInfo>
                        <MiniStatValue>{buildNumberFormat(user.ordersCount)}</MiniStatValue>
                        <MiniStatLabel>Замовлень</MiniStatLabel>
                    </MiniStatInfo>
                </MiniStat>

                <MiniStat>
                    <MiniStatIcon>
                        <Wrench size={14}/>
                    </MiniStatIcon>
                    <MiniStatInfo>
                        <MiniStatValue>
                            {buildNumberFormat(user.repairsOrdersCount)}
                        </MiniStatValue>
                        <MiniStatLabel>Ремонтів</MiniStatLabel>
                    </MiniStatInfo>
                </MiniStat>
            </UserCenter>

            <UserRight>
                <SpentValue>
                    {user.totalSpent.toLocaleString()} ₴
                </SpentValue>
                <SpentLabel>Загальні витрати</SpentLabel>
                <Actions>
                    <AdminButton admin={user.isAdmin} onClick={toggleAdmin}>
                        <UserCheck size={15}/>
                        {user.isAdmin ? "Забрати доступ" : "Дати доступ"}
                    </AdminButton>
                </Actions>
            </UserRight>
        </UserCard>
    );
};

export default UserItem;

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

const Avatar = styled.div`
    width: 48px;
    height: 48px;

    border-radius: 14px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    font-weight: 900;

    box-shadow: 0 10px 20px rgba(34, 197, 94, 0.18);
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