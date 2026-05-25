import {type Dispatch, type FC, type SetStateAction, useCallback} from "react";
import styled from "styled-components";
import {Check, CreditCard, MapPin, Truck,} from "lucide-react";
import type {FormCheckoutType} from "@pages/checkout/CheckoutPage.tsx";
import PhoneInput from "@pages/checkout/src/PhoneInput.tsx";

interface Props {
    formState: [FormCheckoutType, Dispatch<SetStateAction<FormCheckoutType>>];
}

const LeftForm: FC<Props> = (props) => {
    const {formState} = props;
    const [form, setForm] = formState;

    const update = useCallback((patch: Partial<FormCheckoutType>) => {
        setForm(prev => ({...prev, ...patch}));
    }, [setForm]);

    return (
        <Left>
            <Section>
                <SectionTitle>Контактні дані</SectionTitle>
                <InputsGrid>
                    <InputBlock>
                        <Label>Ім’я та прізвище</Label>
                        <Input placeholder={"Ваше ім’я"}
                               onChange={e => {
                                   update({client_name: e.target.value})
                               }} value={form.client_name}
                        />
                    </InputBlock>
                    <InputBlock>
                        <Label>Номер телефону</Label>
                        <PhoneInput placeholder={"+380"} commitOnBlur
                                    onChange={phone_number => {update({phone_number})}}
                                    value={form.phone_number ?? ""}
                        />
                    </InputBlock>

                    <InputBlock full>
                        <Label>Email</Label>
                        <Input placeholder={"example@gmail.com"}
                               onChange={e => {
                                   update({email: e.target.value})
                               }} value={form.email}
                        />
                    </InputBlock>
                </InputsGrid>
            </Section>

            <Section>
                <SectionTitle>Доставка</SectionTitle>
                <DeliveryList>
                    <DeliveryCard active={form.delivery === "nova"}
                                  onClick={() => update({delivery: "nova"})}
                    >
                        <DeliveryLeft>
                            <DeliveryIcon $active={form.delivery === "nova"}>
                                <Truck size={18}/>
                            </DeliveryIcon>
                            <DeliveryInfo>
                                <DeliveryTitle>Нова Пошта</DeliveryTitle>
                                <DeliveryDescription>
                                    Доставка у відділення або поштомат
                                </DeliveryDescription>
                            </DeliveryInfo>
                        </DeliveryLeft>

                        {form.delivery === "nova" && (
                            <CheckCircle>
                                <Check size={14}/>
                            </CheckCircle>
                        )
                        }
                    </DeliveryCard>
                    <DeliveryCard
                        active={form.delivery === "pickup"}
                        onClick={() => update({delivery: "pickup", post_office: null, post_city: null})}
                    >
                        <DeliveryLeft>
                            <DeliveryIcon $active={form.delivery === "pickup"}>
                                <MapPin size={18}/>
                            </DeliveryIcon>

                            <DeliveryInfo>
                                <DeliveryTitle>Самовивіз</DeliveryTitle>
                                <DeliveryDescription>
                                    Безкоштовно з магазину
                                </DeliveryDescription>
                            </DeliveryInfo>
                        </DeliveryLeft>

                        {form.delivery === "pickup" && (
                            <CheckCircle>
                                <Check size={14}/>
                            </CheckCircle>
                        )
                        }
                    </DeliveryCard>
                </DeliveryList>

                {form.delivery === "nova" && (
                    <InputsGrid style={{marginTop: 18,}}>
                        <InputBlock>
                            <Label>Місто</Label>
                            <Input placeholder={"Запоріжжя"}
                                   onChange={e => {
                                       update({post_city: e.target.value})
                                   }} value={form.post_city ?? ""}
                            />
                        </InputBlock>
                        <InputBlock>
                            <Label>Відділення</Label>
                            <Input placeholder={"№12"}
                                   onChange={e => {
                                       update({post_office: e.target.value})
                                   }} value={form.post_office ?? ""}
                            />
                        </InputBlock>
                    </InputsGrid>
                )}
            </Section>

            <Section>
                <SectionTitle>Оплата</SectionTitle>
                <PaymentList>
                    <PaymentCard
                        $active={form.payment_type === "online"}
                        onClick={() => update({payment_type: "online",})}
                    >
                        <PaymentLeft>
                            <PaymentIcon $active={form.payment_type === "online"}>
                                <CreditCard size={18}/>
                            </PaymentIcon>

                            <PaymentInfo>
                                <PaymentTitle>
                                    Онлайн оплата
                                </PaymentTitle>
                                <PaymentDescription>
                                    Вам продавець надішле дані для оплати товару
                                </PaymentDescription>
                            </PaymentInfo>
                        </PaymentLeft>

                        {form.payment_type === "online" && (
                            <CheckCircle>
                                <Check size={14}/>
                            </CheckCircle>
                        )
                        }
                    </PaymentCard>
                    <PaymentCard
                        $active={form.payment_type === "upon-receipt"}
                        onClick={() => update({payment_type: "upon-receipt",})}
                    >
                        <PaymentLeft>
                            <PaymentIcon $active={form.payment_type === "upon-receipt"}>
                                <CreditCard size={18}/>
                            </PaymentIcon>

                            <PaymentInfo>
                                <PaymentTitle>
                                    Оплата при отриманні
                                </PaymentTitle>
                                <PaymentDescription>
                                    Ви зможете оплатити товар після отримання
                                </PaymentDescription>
                            </PaymentInfo>
                        </PaymentLeft>

                        {form.payment_type === "upon-receipt" && (
                            <CheckCircle>
                                <Check size={14}/>
                            </CheckCircle>
                        )
                        }
                    </PaymentCard>
                </PaymentList>
            </Section>
        </Left>
    );
};

export default LeftForm;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const Section = styled.div`
    padding: 24px;

    border-radius: 28px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
`;

const SectionTitle = styled.div`
    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const InputsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;

    margin-top: 22px;
`;

const InputBlock = styled.div<{ full?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    grid-column: ${({full}) =>
            full ? "1 / -1" : "auto"};
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const Input = styled.input`
    width: 100%;

    height: 52px;

    padding: 0 16px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;

    box-sizing: border-box;

    &:focus {
        background: white;

        border-color: #94a3b8;
    }
`;

const DeliveryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const DeliveryCard = styled.div<{ active?: boolean }>`
    min-height: 92px;

    padding: 18px;

    border-radius: 22px;

    background: ${({active}) =>
            active
                    ? "rgba(34,197,94,0.08)"
                    : "#f8fafc"};

    border: 1px solid ${({active}) =>
            active
                    ? "rgba(34,197,94,0.20)"
                    : "#edf2f7"};

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    box-sizing: border-box;

    transition: 0.16s ease;
`;

const DeliveryLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const DeliveryIcon = styled.div<{ $active?: boolean }>`
    width: 54px;
    height: 54px;

    border-radius: 18px;

    background: ${({$active}) =>
            $active
                    ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
                    : "white"};

    color: ${({$active}) =>
            $active ? "white" : "#0f172a"};

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeliveryInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeliveryTitle = styled.div`
    font-size: 16px;
    font-weight: 800;

    color: #0f172a;
`;

const DeliveryDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;

    border-radius: 999px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const PaymentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 22px;
`;

const PaymentCard = styled.div<{ $active?: boolean }>`
    min-height: 92px;

    padding: 18px;

    border-radius: 22px;

    background: ${({$active}) =>
            $active
                    ? "rgba(34,197,94,0.08)"
                    : "#f8fafc"};

    border: 1px solid ${({$active}) =>
            $active
                    ? "rgba(34,197,94,0.20)"
                    : "#edf2f7"};

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    box-sizing: border-box;

    transition: 0.16s ease;
`;

const PaymentLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const PaymentIcon = styled.div<{ $active?: boolean }>`
    width: 54px;
    height: 54px;

    border-radius: 18px;

    background: ${({$active}) =>
            $active
                    ? "linear-gradient(135deg,#16a34a 0%,#22c55e 100%)"
                    : "white"};

    color: ${({$active}) =>
            $active ? "white" : "#0f172a"};

    border: 1px solid #e2e8f0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const PaymentInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const PaymentTitle = styled.div`
    font-size: 16px;
    font-weight: 800;

    color: #0f172a;
`;

const PaymentDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;