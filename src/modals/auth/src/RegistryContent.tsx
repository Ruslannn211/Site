import {type FC, useCallback, useState} from "react";
import styled from "styled-components";
import {Lock, Mail, Phone, User,} from "lucide-react";
import PhoneInput from "./PhoneInput.tsx";
import useRegistry from "@hooks/useRegistry.tsx";
import Spinner from "@components/ui/Spinner.tsx";

interface Props {
    toggleMode: () => void;
    onClose: () => void;
}

type FormType = {
    phone_number: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string | null;
    patronymic: string | null;
}

const RegistryContent: FC<Props> = (props) => {
    const {toggleMode, onClose} = props;

    const [form, setForm] = useState<FormType>({
        password: "",
        phone_number: "",
        email: "",
        first_name: "",
        last_name: null,
        patronymic: null
    });
    const update = useCallback((patch: Partial<FormType>) => {
        setForm(prev => ({...prev, ...patch}));
    }, [setForm]);

    const {loading, handle: handleRegistry} = useRegistry();
    const [error, setError] = useState("");

    const submit = async () => {
        if (loading) return;

        setError("");

        if (form.password.trim().length < 1 || form.phone_number.trim().length < 1
            || form.email.trim().length < 1 || form.first_name.trim().length < 1
        ) {
            setError("Не всі поля були заповнені.");
            return;
        }

        const response = await handleRegistry(form);
        if (!response) {
            setError("Цей номер телефону вже використовується.");
            return;
        }

        onClose();
        // success
    };

    return (
        <Container>
            <Top>
                <Title>Реєстрація</Title>
                <Description>Створіть новий акаунт</Description>
            </Top>

            <Form>
                <InputBlock>
                    <Label>Ім’я</Label>
                    <InputWrapper>
                        <InputIcon>
                            <User size={16}/>
                        </InputIcon>
                        <Input placeholder={"Ваше ім’я"}
                               value={form.first_name}
                               onChange={e =>
                                   update({first_name: e.target.value})
                               }
                        />
                    </InputWrapper>
                </InputBlock>

                <Row>
                    <InputBlock>
                        <Label>Прізвище</Label>
                        <InputWrapper>
                            <Input placeholder={"Не обов’язково"}
                                   value={form.last_name ?? ""}
                                   onChange={e =>
                                       update({last_name: e.target.value})
                                   }
                            />
                        </InputWrapper>
                    </InputBlock>

                    <InputBlock>
                        <Label>По батькові</Label>
                        <InputWrapper>
                            <Input placeholder={"Не обов’язково"}
                                   value={form.patronymic ?? ""}
                                   onChange={e =>
                                       update({patronymic: e.target.value})
                                   }
                            />
                        </InputWrapper>
                    </InputBlock>
                </Row>

                <InputBlock>
                    <Label>Email</Label>
                    <InputWrapper>
                        <InputIcon>
                            <Mail size={16}/>
                        </InputIcon>
                        <Input placeholder={"example@gmail.com"}
                               value={form.email}
                               onChange={e =>
                                   update({email: e.target.value})
                               }
                        />
                    </InputWrapper>
                </InputBlock>

                <InputBlock>
                    <Label>Номер телефону</Label>

                    <InputWrapper>
                        <InputIcon>
                            <Phone size={16}/>
                        </InputIcon>
                        <PhoneInput
                            placeholder={"+380"}
                            value={form.phone_number}
                            commitOnBlur={true}
                            onChange={(phone_number) =>
                                update({phone_number})
                            }
                        />
                    </InputWrapper>
                </InputBlock>

                <InputBlock>
                    <Label>Пароль</Label>
                    <InputWrapper>
                        <InputIcon>
                            <Lock size={16}/>
                        </InputIcon>
                        <Input type="password"
                               placeholder={"Ваш пароль"}
                               value={form.password}
                               onChange={e =>
                                   update({password: e.target.value})
                               }
                        />
                    </InputWrapper>
                </InputBlock>
                {!!error && (<ErrorText>{error}</ErrorText>)}

                <SubmitButton disabled={loading} onClick={submit}>
                    {loading ? (<><Spinner/>Створюємо обліковий запис...</>) : ("Створити акаунт")}
                </SubmitButton>
            </Form>

            <Bottom>
                Вже є акаунт?
                <SwitchButton onClick={toggleMode}>
                    Увійти
                </SwitchButton>
            </Bottom>
        </Container>
    );
};

export default RegistryContent;

const Container = styled.div`
    padding: 44px;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    overflow-y: auto;
    min-height: 0;
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

const ErrorText = styled.div`
    margin-top: -4px;

    font-size: 13px;
    font-weight: 600;

    color: #ef4444;
`;

const SubmitButton = styled.button`
    width: 100%;

    height: 58px;

    margin-top: 10px;

    border: none;
    border-radius: 18px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    box-shadow: 0 18px 30px rgba(34, 197, 94, 0.24);

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