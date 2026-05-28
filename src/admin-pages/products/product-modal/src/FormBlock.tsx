import {type Dispatch, type FC, type SetStateAction} from "react";
import styled from "styled-components";

import useCategoriesList from "@hooks/useCategoriesList.tsx";
import type {ProductType,} from "@types-lib";
import type {ProductFormType} from "../ProductModal.tsx";

interface Props {
    formState: [ProductFormType, Dispatch<SetStateAction<ProductFormType>>];
}

const FormBlock: FC<Props> = (props) => {
    const [form, setForm] = props.formState;
    const {list: categories} = useCategoriesList();

    const updateForm = <K extends keyof ProductFormType>(
        key: K, value: ProductFormType[K]
    ) => {
        setForm(prev => ({
            ...prev, [key]: value,
        }));
    };

    if (!open) {
        return null;
    }

    return (
        <Section>
            <SectionTitle>
                Основна інформація
            </SectionTitle>

            <InputsGrid>
                <InputBlock full>
                    <Label>Назва товару</Label>

                    <Input
                        value={form.name}
                        onChange={e =>
                            updateForm(
                                "name",
                                e.target.value
                            )
                        }
                        placeholder="Назва товару"
                    />
                </InputBlock>

                <InputBlock>
                    <Label>Ціна</Label>

                    <Input
                        type="number"
                        value={form.price}
                        onChange={e =>
                            updateForm(
                                "price",
                                Number(
                                    e.target.value
                                )
                            )
                        }
                        placeholder="0"
                    />
                </InputBlock>

                <InputBlock>
                    <Label>Кількість</Label>

                    <Input
                        type="number"
                        value={form.count}
                        onChange={e =>
                            updateForm(
                                "count",
                                Number(
                                    e.target.value
                                )
                            )
                        }
                        placeholder="0"
                    />
                </InputBlock>

                <InputBlock>
                    <Label>Знижка</Label>

                    <Input
                        type="number"
                        value={
                            form.discount ?? ""
                        }
                        onChange={e =>
                            updateForm(
                                "discount",
                                e.target.value
                                    ? Number(
                                        e.target.value
                                    )
                                    : null
                            )
                        }
                        placeholder="0%"
                    />
                </InputBlock>

                <InputBlock>
                    <Label>Гарантія</Label>

                    <Input
                        type="number"
                        value={form.guarantee}
                        onChange={e =>
                            updateForm(
                                "guarantee",
                                Number(
                                    e.target.value
                                )
                            )
                        }
                        placeholder="0"
                    />
                </InputBlock>

                <InputBlock>
                    <Label>Категорія</Label>

                    <Select
                        value={form.category}
                        onChange={e =>
                            updateForm(
                                "category",
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Оберіть категорію
                        </option>

                        {categories.map(category => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </Select>
                </InputBlock>

                <InputBlock>
                    <Label>Позначка</Label>

                    <Select
                        value={
                            form.badge ?? ""
                        }
                        onChange={e =>
                            updateForm(
                                "badge",
                                (e.target
                                        .value ||
                                    null) as ProductType["badge"]
                            )
                        }
                    >
                        <option value="">
                            Без позначки
                        </option>

                        <option value="new">
                            NEW
                        </option>

                        <option value="top">
                            ТОП
                        </option>

                        <option value="promotion">
                            АКЦІЯ
                        </option>
                    </Select>
                </InputBlock>

                <InputBlock>
                    <Label>Доставка</Label>

                    <Select
                        value={
                            form.delivery ??
                            ""
                        }
                        onChange={e =>
                            updateForm(
                                "delivery",
                                (e.target
                                        .value ||
                                    null) as ProductType["delivery"]
                            )
                        }
                    >
                        <option value="">
                            Не вибрано
                        </option>

                        <option value="free">
                            Безкоштовна
                        </option>

                        <option value="client">
                            За рахунок клієнта
                        </option>
                    </Select>
                </InputBlock>

                <InputBlock>
                    <Label>Код товару</Label>

                    <Input
                        value={form.code}
                        onChange={e =>
                            updateForm(
                                "code",
                                e.target.value
                            )
                        }
                        placeholder="Код товару"
                    />
                </InputBlock>

                <InputBlock full>
                    <Label>Опис</Label>

                    <Textarea
                        value={
                            form.description ??
                            ""
                        }
                        onChange={e =>
                            updateForm(
                                "description",
                                e.target.value
                            )
                        }
                        placeholder="Опис товару..."
                    />
                </InputBlock>
            </InputsGrid>
        </Section>
    );
};

export default FormBlock;

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.div`
    font-size: 17px;
    font-weight: 800;

    color: #0f172a;
`;

const InputsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;

    margin-top: 18px;
`;

const InputBlock = styled.div<{
    full?: boolean;
}>`
    display: flex;
    flex-direction: column;
    gap: 8px;

    grid-column: ${({full}) =>
    full
        ? "1 / -1"
        : "auto"};
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #334155;
`;

const Input = styled.input`
    width: 100%;

    height: 48px;

    padding: 0 15px;

    border-radius: 8px;

    border: 1px solid #e2e8f0;

    background: white;

    outline: none;

    font-size: 14px;

    transition: .16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #22c55e;

        box-shadow: 0 0 0 4px rgba(34, 197, 94, .10);
    }
`;

const Select = styled.select`
    width: 100%;

    height: 48px;

    padding: 0 15px;

    border-radius: 8px;

    border: 1px solid #e2e8f0;

    background: white;

    outline: none;

    font-size: 14px;

    transition: .16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #22c55e;

        box-shadow: 0 0 0 4px rgba(34, 197, 94, .10);
    }
`;

const Textarea = styled.textarea`
    width: 100%;

    min-height: 150px;

    resize: vertical;

    padding: 16px;

    border-radius: 8px;

    border: 1px solid #e2e8f0;

    background: white;

    outline: none;

    font-size: 14px;
    line-height: 1.7;

    transition: .16s ease;

    box-sizing: border-box;

    &:focus {
        border-color: #22c55e;

        box-shadow: 0 0 0 4px rgba(34, 197, 94, .10);
    }
`;