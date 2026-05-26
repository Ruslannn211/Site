import {type FC, useCallback, useMemo, useState} from "react";
import styled from "styled-components";
import {Check, X,} from "lucide-react";
import type {RepairPriceType} from "@types-lib";
import PhoneInput from "@pages/repair/repair-modal/src/PhoneInput.tsx";
import {useStore} from "@store";
import {buildClientName} from "@helpers/buildClientName.ts";
import useRepairOrder from "@hooks/useRepairOrder.tsx";
import Spinner from "@components/ui/Spinner.tsx";

interface Props {
    open: boolean;
    onClose: () => void;
    price: RepairPriceType[];
}

export type FormRepairOrderType = {
    client_name: string;
    phone_number: string;
    phone_model: string;
    description: string | null;
}

const RepairModal: FC<Props> = (props) => {
    const {open, onClose, price} = props;
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const {user} = useStore(store => store.global.user);

    const [form, setForm] = useState<FormRepairOrderType>({
        client_name: user ? buildClientName(user) : "", phone_model: "", phone_number: user?.phone_number ?? "", description: null
    });

    const update = useCallback((patch: Partial<FormRepairOrderType>) => {
        setForm(prev => ({...prev, ...patch}));
    }, [setForm]);

    const totalPrice = useMemo(() => {
        return price.filter(option => selectedOptions.includes(option.id))
            .reduce((acc, option) => acc + option.price, 0);
    }, [selectedOptions, price]);

    const toggleOption = (id: number) => {
        setSelectedOptions(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const isActive = form.client_name.trim().length > 0 && form.phone_number.length > 0 && form.phone_model.length > 0 && selectedOptions.length > 0;

    const {handle: createOrder, loading} = useRepairOrder();
    async function submit() {
        const response = await createOrder({...form, price_selected: selectedOptions});
        if (response) {
            onClose();
        }
    }

    return (
        <Overlay open={open}>
            <Modal>
                <ModalHeader>
                    <ModalTitle>Замовлення ремонту</ModalTitle>
                    <CloseButton onClick={onClose}>
                        <X size={18} />
                    </CloseButton>
                </ModalHeader>
                <Form>
                    <Block>
                        <BlockTitle>Оберіть послуги ремонту</BlockTitle>
                        <OptionsGrid>
                            {price.map(option => {
                                const active = selectedOptions.includes(option.id);
                                return (
                                    <OptionCard
                                        key={option.id}
                                        active={active}
                                        onClick={() => toggleOption(option.id)}
                                    >
                                        <OptionCheck active={active}>
                                            <Check size={12} />
                                        </OptionCheck>

                                        <OptionInfo>
                                            <OptionTitle>{option.name}</OptionTitle>
                                            <OptionPrice>{option.price.toLocaleString()} ₴</OptionPrice>
                                        </OptionInfo>
                                    </OptionCard>
                                );
                            })}
                        </OptionsGrid>
                    </Block>

                    <InputsGrid>
                        <InputBlock>
                            <Label>ПІБ</Label>
                            <Input placeholder={"Ваше ім’я"}
                                   onChange={e => {
                                       update({client_name: e.target.value})
                                   }} value={form.client_name}
                            />
                        </InputBlock>

                        <InputBlock>
                            <Label>Номер телефону</Label>
                            <PhoneInput placeholder={"+380"}
                                        onChange={phone_number => {
                                            update({phone_number})
                                        }} value={form.phone_number}
                            />
                        </InputBlock>

                        <InputBlock full>
                            <Label>Назва/Модель пристрою</Label>
                            <Input placeholder={"Наприклад iPhone 15 Pro Max"}
                                   onChange={e => {
                                       update({phone_model: e.target.value})
                                   }} value={form.phone_model}
                            />
                        </InputBlock>

                        <InputBlock full>
                            <Label>Опис поломки</Label>
                            <Textarea placeholder={"Опишіть проблему або симптоми..."}
                                      onChange={e => {
                                          update({description: e.target.value})
                                      }} value={form.description ?? ""}
                            />
                        </InputBlock>
                    </InputsGrid>

                    <Summary>
                        <SummaryLeft>
                            <SummaryLabel>
                                Загальна вартість ремонту
                            </SummaryLabel>

                            <SummaryDescription>
                                Без урахування доставки та додаткової діагностики
                            </SummaryDescription>
                        </SummaryLeft>

                        <SummaryPrice>
                            {totalPrice.toLocaleString()} ₴
                        </SummaryPrice>
                    </Summary>

                    <SubmitButton disabled={!isActive || loading} onClick={submit}>
                        {loading ? (<><Spinner />Надсилаємо ремонт...</>) : ("Підтвердити замовлення ремонту")}
                    </SubmitButton>

                    <BottomText>
                        Після відправки заявки менеджер звʼяжеться з вами для уточнення деталей ремонту.
                    </BottomText>
                </Form>
            </Modal>
        </Overlay>
    );
};

export default RepairModal;

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 200;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: rgba(15,23,42,0.38);

    backdrop-filter: blur(6px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 860px;

    max-height: calc(100vh - 48px);

    display: flex;
    flex-direction: column;
    overflow: hidden;

    border-radius: 24px;

    background: white;

    border: 1px solid #e2e8f0;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.20);

    box-sizing: border-box;
`;

const ModalHeader = styled.div`
    position: sticky;
    top: 0;

    z-index: 2;

    padding: 10px 24px;

    background: rgba(255,255,255,0.94);

    backdrop-filter: blur(12px);

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const ModalTitle = styled.div`
    font-size: 26px;
    font-weight: 900;

    color: #0f172a;
`;

const CloseButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Form = styled.div`
    flex: 1;

    overflow-y: auto;

    padding: 24px;

    box-sizing: border-box;

    min-height: 0;
`;

const Block = styled.div`
    margin-bottom: 28px;
`;

const BlockTitle = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;

    margin-bottom: 14px;
`;

const OptionsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 6px;
`;

const OptionCard = styled.button<{ active: boolean }>`

    padding: 14px;

    border-radius: 8px;

    border: 1px solid ${({ active }) =>
    active ? "#22c55e" : "#e2e8f0"};

    background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.06)"
        : "white"};

    display: flex;
    align-items: flex-start;
    gap: 12px;

    cursor: pointer;

    transition: 0.16s ease;

    box-sizing: border-box;
`;

const OptionCheck = styled.div<{ active: boolean }>`
    width: 20px;
    height: 20px;

    min-width: 20px;

    border-radius: 6px;

    border: 1px solid ${({ active }) =>
    active ? "#22c55e" : "#cbd5e1"};

    background: ${({ active }) =>
    active ? "#22c55e" : "white"};

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const OptionTitle = styled.div`
    text-align: start;
    font-size: 14px;
    font-weight: 700;

    color: #0f172a;
`;

const OptionPrice = styled.div`
    text-align: start;
    margin-top: 3px;

    font-size: 13px;
    font-weight: 800;

    color: #16a34a;
`;

const InputsGrid = styled.div`
    margin-top: -10px;
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;
`;

const InputBlock = styled.div<{ full?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    grid-column: ${({ full }) =>
    full ? "1 / -1" : "auto"};
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const Input = styled.input`
    width: 100%;

    height: 50px;

    padding: 0 16px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;
    font-family: var(--font-ui);

    outline: none;

    background: #f8fafc;

    font-size: 14px;

    transition: 0.16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #94a3b8;
        background: white;
    }
`;

const Textarea = styled.textarea`
    width: 100%;

    min-height: 120px;

    resize: vertical;
    font-family: var(--font-ui);

    padding: 14px 16px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;

    outline: none;

    background: #f8fafc;

    font-size: 14px;
    line-height: 1.7;

    transition: 0.16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #94a3b8;
        background: white;
    }
`;

const Summary = styled.div`
    margin-top: 28px;

    padding: 20px;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const SummaryLeft = styled.div`
    flex: 1;
`;

const SummaryLabel = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const SummaryDescription = styled.div`
    margin-top: 6px;

    font-size: 13px;
    line-height: 1.6;

    color: #64748b;
`;

const SummaryPrice = styled.div`
    font-size: 38px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #16a34a;
`;

const SubmitButton = styled.button`
    width: 100%;

    height: 58px;

    margin-top: 24px;

    border: none;
    border-radius: 18px;

    background: linear-gradient(
            135deg,
            #16a34a 0%,
            #22c55e 100%
    );

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    box-shadow: 0 18px 30px rgba(34, 197, 94, 0.24);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }

    ${p => p.disabled && `
        cursor: not-allowed;
        box-shadow: none;
        background: linear-gradient(
                135deg,#969f98 0%,#bdc9c2 100%
        );
        
        &:hover {
            transform: none;
        }
    `}
`;

const BottomText = styled.div`
    margin-top: 14px;

    text-align: center;

    font-size: 13px;
    line-height: 1.7;

    color: #64748b;
`;