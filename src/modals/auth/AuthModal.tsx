import {type FC, useEffect, useState} from "react";
import styled from "styled-components";
import {ShieldCheck, X,} from "lucide-react";
import LoginContent from "./src/LoginContent.tsx";
import RegistryContent from "./src/RegistryContent.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AuthModal: FC<Props> = (props) => {
    const {open, onClose} = props;
    const [mode, setMode] = useState<"login" | "register">("login");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <Overlay open={open} onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <X size={24} />
                </CloseButton>

                <Left>
                    <LogoBlock>
                        <LogoCircle>
                            <ShieldCheck size={34}/>
                        </LogoCircle>
                        <LogoTitle>TechPanda</LogoTitle>
                        <LogoDescription>
                            Інтернет магазин техніки та сервісу ремонту
                        </LogoDescription>
                    </LogoBlock>

                    <Features>
                        <Feature>
                            <FeatureDot />
                            Швидке оформлення замовлень
                        </Feature>

                        <Feature>
                            <FeatureDot />
                            Історія покупок та ремонтів
                        </Feature>

                        <Feature>
                            <FeatureDot />
                            Відстеження статусу замовлення
                        </Feature>
                    </Features>
                </Left>

                {mode === "login"
                    ? <LoginContent toggleMode={() => setMode("register")} onClose={onClose} />
                    : <RegistryContent toggleMode={() => setMode("login")} onClose={onClose} />
                }
            </Modal>
        </Overlay>
    );
};

export default AuthModal;

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 800;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: rgba(15,23,42,0.42);

    backdrop-filter: blur(8px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    position: relative;

    width: 100%;
    max-width: 980px;

    height: 720px;
    min-height: 0;

    display: grid;

    grid-template-columns: 420px 1fr;

    overflow: hidden;

    border-radius: 30px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.18);
`;

const CloseButton = styled.button`
    position: absolute;

    top: 20px;
    right: 20px;

    width: 42px;
    height: 42px;

    border-radius: 8px;
    background-color: white;
    border: none;

    color: rgb(0,0,0);

    backdrop-filter: blur(10px);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    z-index: 10;
`;

const Left = styled.div`
    padding: 40px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
`;

const LogoBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const LogoCircle = styled.div`
    width: 84px;
    height: 84px;

    border-radius: 26px;

    background: rgba(255,255,255,0.14);

    backdrop-filter: blur(12px);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoTitle = styled.div`
    margin-top: 28px;

    font-size: 42px;
    font-weight: 900;

    letter-spacing: -0.07em;
`;

const LogoDescription = styled.div`
    margin-top: 18px;

    font-size: 15px;
    line-height: 1.8;

    opacity: 0.92;
`;

const Features = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const Feature = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    font-size: 14px;
    font-weight: 600;
`;

const FeatureDot = styled.div`
    width: 10px;
    height: 10px;

    border-radius: 999px;

    background: white;
`;