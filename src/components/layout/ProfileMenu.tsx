import {type FC, useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {
    ChevronDown,
    LogOut,
    ShieldCheck,
    User,
} from "lucide-react";

import {useNavigate} from "react-router-dom";
import type {UserType} from "@types-lib";
import {useAppDispatch} from "@store";
import {logoutThunk} from "@store/thunks/global/user/thunks.ts";

interface Props {
    user: UserType;
}

const ProfileMenu: FC<Props> = (props) => {
    const {user} = props;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    function handleLogout() {
        dispatch(logoutThunk());
    }

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`;

    return (
        <Container ref={ref}>
            <ProfileButton onClick={() => setOpen(prev => !prev)}>
                <Avatar>
                    {initials || (<User size={16}/>)}
                </Avatar>

                <ProfileInfo>
                    <ProfileName>{user.first_name}</ProfileName>
                    <ProfilePhone>{user.phone_number}</ProfilePhone>
                </ProfileInfo>

                <ChevronIcon $open={open}>
                    <ChevronDown size={16}/>
                </ChevronIcon>
            </ProfileButton>

            <Dropdown $open={open}>
                <DropdownUser>
                    <DropdownAvatar>
                        {initials || (<User size={18}/>)}
                    </DropdownAvatar>

                    <DropdownInfo>
                        <DropdownName>
                            {[user.first_name, user.last_name,].filter(Boolean).join(" ")}
                        </DropdownName>
                        <DropdownEmail>
                            {user.email || user.phone_number}
                        </DropdownEmail>
                    </DropdownInfo>
                </DropdownUser>

                <Divider/>

                {user.isAdmin && (
                    <MenuButton onClick={() => {
                        navigate("/control");
                        setOpen(false);
                    }}
                    >
                        <ShieldCheck size={17}/>
                        Адмін панель
                    </MenuButton>
                )}

                <MenuButton danger
                            onClick={() => {
                                handleLogout();
                                setOpen(false);
                            }}
                >
                    <LogOut size={17}/>
                    Вийти
                </MenuButton>
            </Dropdown>
        </Container>
    );
};

export default ProfileMenu;

const Container = styled.div`
    position: relative;
`;

const ProfileButton = styled.button`
    height: 42px;

    padding: 0 12px 0 8px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background: linear-gradient(
            180deg,
            #ffffff 0%,
            #f8fafc 100%
    );

    display: flex;
    align-items: center;
    gap: 10px;

    cursor: pointer;

    transition: 0.18s ease;

    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.04);

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow: 0 10px 18px rgba(15, 23, 42, 0.08);
    }
`;

const Avatar = styled.div`
    width: 28px;
    height: 28px;

    border-radius: 9px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    font-weight: 800;

    flex-shrink: 0;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    min-width: 0;
`;

const ProfileName = styled.div`
    font-size: 13px;
    font-weight: 800;

    color: #0f172a;

    line-height: 1;
`;

const ProfilePhone = styled.div`
    margin-top: 3px;

    font-size: 11px;
    font-weight: 600;

    color: #64748b;

    line-height: 1;
`;

const ChevronIcon = styled.div<{
    $open?: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: center;

    color: #64748b;

    transition: 0.18s ease;

    transform: rotate(
            ${({$open}) =>
                    $open
                            ? "180deg"
                            : "0deg"}
    );
`;

const Dropdown = styled.div<{
    $open?: boolean;
}>`
    position: absolute;

    top: calc(100% + 10px);
    right: 0;

    width: 280px;

    padding: 10px;

    border-radius: 18px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);

    display: flex;
    flex-direction: column;
    gap: 6px;

    opacity: ${({$open}) =>
            $open ? 1 : 0};

    visibility: ${({$open}) =>
            $open
                    ? "visible"
                    : "hidden"};

    transform: translateY(
            ${({$open}) =>
                    $open
                            ? "0"
                            : "-8px"}
    ) scale(
            ${({$open}) =>
                    $open
                            ? 1
                            : 0.98}
    );

    transition: 0.18s ease;

    z-index: 200;
`;

const DropdownUser = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 10px;
`;

const DropdownAvatar = styled.div`
    width: 42px;
    height: 42px;

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

    font-size: 15px;
    font-weight: 900;

    flex-shrink: 0;
`;

const DropdownInfo = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 0;
`;

const DropdownName = styled.div`
    font-size: 14px;
    font-weight: 800;

    color: #0f172a;
`;

const DropdownEmail = styled.div`
    margin-top: 4px;

    font-size: 12px;
    font-weight: 600;

    color: #64748b;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;

    background: #edf2f7;

    margin: 4px 0;
`;

const MenuButton = styled.button<{
    danger?: boolean;
}>`
    width: 100%;
    height: 46px;

    padding: 0 14px;

    border: none;
    border-radius: 12px;

    background: ${({danger}) =>
            danger
                    ? "rgba(239,68,68,0.08)"
                    : "transparent"};

    color: ${({danger}) =>
            danger
                    ? "#ef4444"
                    : "#0f172a"};

    display: flex;
    align-items: center;
    gap: 12px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: ${({danger}) =>
                danger
                        ? "rgba(239,68,68,0.12)"
                        : "#f8fafc"};
    }
`;