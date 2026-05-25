import {type FC, useEffect, useState} from "react";
import styled from "styled-components";
import {
    Lock,
    Mail,
    Phone,
    ShieldCheck,
    User,
    X,
} from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AuthModal: FC<Props> = ({
                                  open,
                                  onClose,
                              }) => {
    const [mode, setMode] = useState<
        "login" | "register"
    >("login");

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
                            <ShieldCheck
                                size={34}
                            />
                        </LogoCircle>

                        <LogoTitle>
                            TechPanda
                        </LogoTitle>

                        <LogoDescription>
                            Інтернет магазин
                            техніки та сервісу
                            ремонту
                        </LogoDescription>
                    </LogoBlock>

                    <Features>
                        <Feature>
                            <FeatureDot />

                            Швидке оформлення
                            замовлень
                        </Feature>

                        <Feature>
                            <FeatureDot />

                            Історія покупок та
                            ремонтів
                        </Feature>

                        <Feature>
                            <FeatureDot />

                            Відстеження статусу
                            замовлення
                        </Feature>
                    </Features>
                </Left>

                <Right $c={mode === "login"}>
                    <Top>
                        <Title>
                            {mode === "login"
                                ? "Вхід до акаунту"
                                : "Реєстрація"}
                        </Title>

                        <Description>
                            {mode === "login"
                                ? "Увійдіть до свого акаунту"
                                : "Створіть новий акаунт"}
                        </Description>
                    </Top>

                    <Form>
                        {mode === "register" && (
                            <>
                                <InputBlock>
                                    <Label>
                                        Ім’я
                                    </Label>

                                    <InputWrapper>
                                        <InputIcon>
                                            <User
                                                size={
                                                    16
                                                }
                                            />
                                        </InputIcon>

                                        <Input
                                            placeholder={
                                                "Ваше ім’я"
                                            }
                                        />
                                    </InputWrapper>
                                </InputBlock>

                                <Row>
                                    <InputBlock>
                                        <Label>
                                            Прізвище
                                        </Label>

                                        <InputWrapper>
                                            <Input
                                                placeholder={
                                                    "Не обов’язково"
                                                }
                                            />
                                        </InputWrapper>
                                    </InputBlock>

                                    <InputBlock>
                                        <Label>
                                            По батькові
                                        </Label>

                                        <InputWrapper>
                                            <Input
                                                placeholder={
                                                    "Не обов’язково"
                                                }
                                            />
                                        </InputWrapper>
                                    </InputBlock>
                                </Row>

                                <InputBlock>
                                    <Label>
                                        Email
                                    </Label>

                                    <InputWrapper>
                                        <InputIcon>
                                            <Mail
                                                size={
                                                    16
                                                }
                                            />
                                        </InputIcon>

                                        <Input
                                            placeholder={
                                                "example@gmail.com"
                                            }
                                        />
                                    </InputWrapper>
                                </InputBlock>
                            </>
                        )}

                        <InputBlock>
                            <Label>
                                Номер телефону
                            </Label>

                            <InputWrapper>
                                <InputIcon>
                                    <Phone
                                        size={16}
                                    />
                                </InputIcon>

                                <Input
                                    placeholder={
                                        "+380"
                                    }
                                />
                            </InputWrapper>
                        </InputBlock>

                        <InputBlock>
                            <Label>
                                Пароль
                            </Label>

                            <InputWrapper>
                                <InputIcon>
                                    <Lock
                                        size={16}
                                    />
                                </InputIcon>

                                <Input
                                    type="password"
                                    placeholder={
                                        "Ваш пароль"
                                    }
                                />
                            </InputWrapper>
                        </InputBlock>

                        <SubmitButton>
                            {mode === "login"
                                ? "Увійти"
                                : "Створити акаунт"}
                        </SubmitButton>
                    </Form>

                    <Bottom>
                        {mode === "login"
                            ? "Немає акаунту?"
                            : "Вже є акаунт?"}

                        <SwitchButton
                            onClick={() =>
                                setMode(prev =>
                                    prev ===
                                    "login"
                                        ? "register"
                                        : "login"
                                )
                            }
                        >
                            {mode === "login"
                                ? "Реєстрація"
                                : "Увійти"}
                        </SwitchButton>
                    </Bottom>
                </Right>
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

const Right = styled.div<{$c?: boolean}>`
    padding: 44px;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    overflow-y: auto;
    min-height: 0;
    
    ${p => p.$c && `
        justify-content: center;
    `}
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 38px;
    font-weight: 900;

    letter-spacing: -0.06em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 10px;

    font-size: 14px;

    color: #64748b;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;

    margin-top: 34px;
`;

const Row = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 14px;
`;

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const InputWrapper = styled.div`
    position: relative;

    width: 100%;
`;

const InputIcon = styled.div`
    position: absolute;

    top: 50%;
    left: 16px;

    transform: translateY(-50%);

    color: #94a3b8;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 100%;

    height: 54px;

    padding: 0 16px 0 48px;

    border-radius: 18px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;

    box-sizing: border-box;

    transition: 0.16s ease;

    &:focus {
        background: white;

        border-color: #94a3b8;
    }
`;

const SubmitButton = styled.button`
    width: 100%;

    height: 58px;

    margin-top: 10px;

    border: none;
    border-radius: 18px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 18px 30px rgba(34,197,94,0.24);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const Bottom = styled.div`
    margin-top: 24px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 14px;

    color: #64748b;
`;

const SwitchButton = styled.button`
    border: none;

    background: transparent;

    color: #16a34a;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;
`;