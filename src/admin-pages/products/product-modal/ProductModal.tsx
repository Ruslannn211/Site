import {type FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    ImagePlus,
    Plus,
    Trash2,
    X,
} from "lucide-react";

interface Props {
    open: boolean;
    onClose?: () => void;
}

interface Characteristic {
    id: number;
    key: string;
    value: string;
}

const CATEGORIES = [
    "Смартфони",
    "Ноутбуки",
    "Навушники",
    "Компʼютери",
    "Комплектуючі",
    "Телевізори",
    "Смарт годинники",
];

const ProductModal: FC<Props> = ({
                                     open,
                                     onClose,
                                 }) => {
    const [images, setImages] = useState<string[]>([]);

    const [characteristics, setCharacteristics] =
        useState<Characteristic[]>([
            {
                id: 1,
                key: "",
                value: "",
            },
        ]);

    const addCharacteristic = () => {
        setCharacteristics(prev => [
            ...prev,
            {
                id: Date.now(),
                key: "",
                value: "",
            },
        ]);
    };

    const removeCharacteristic = (id: number) => {
        setCharacteristics(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const updateCharacteristic = (
        id: number,
        field: "key" | "value",
        value: string
    ) => {
        setCharacteristics(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    };

    const previewImages = useMemo(() => {
        return images.map(image =>
            URL.createObjectURL(image as any)
        );
    }, [images]);

    return (
        <Overlay open={open}>
            <Modal>
                <Header>
                    <HeaderLeft>
                        <Title>
                            Створення товару
                        </Title>

                        <Description>
                            Додавання нового товару
                            до магазину
                        </Description>
                    </HeaderLeft>

                    <CloseButton
                        onClick={onClose}
                    >
                        <X size={18} />
                    </CloseButton>
                </Header>

                <Content>
                    <Left>
                        <Section>
                            <SectionTitle>
                                Фотографії товару
                            </SectionTitle>

                            <UploadButton>
                                <ImagePlus size={18} />

                                Завантажити фото

                                <HiddenInput
                                    multiple
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        const files =
                                            Array.from(
                                                e.target
                                                    .files ||
                                                []
                                            );

                                        setImages(
                                            prev => [
                                                ...prev,
                                                ...files as any,
                                            ]
                                        );
                                    }}
                                />
                            </UploadButton>

                            <ImagesGrid>
                                {previewImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <ImageCard
                                            key={index}
                                        >
                                            <PreviewImage
                                                src={image}
                                            />

                                            <RemoveImageButton>
                                                <Trash2
                                                    size={
                                                        14
                                                    }
                                                />
                                            </RemoveImageButton>
                                        </ImageCard>
                                    )
                                )}
                            </ImagesGrid>
                        </Section>

                        <Section>
                            <SectionTitle>
                                Основна інформація
                            </SectionTitle>

                            <InputsGrid>
                                <InputBlock full>
                                    <Label>
                                        Назва товару
                                    </Label>

                                    <Input
                                        placeholder={
                                            "Назва товару"
                                        }
                                    />
                                </InputBlock>

                                <InputBlock>
                                    <Label>
                                        Ціна
                                    </Label>

                                    <Input
                                        placeholder={
                                            "0 ₴"
                                        }
                                    />
                                </InputBlock>

                                <InputBlock>
                                    <Label>
                                        Стара ціна
                                    </Label>

                                    <Input
                                        placeholder={
                                            "0 ₴"
                                        }
                                    />
                                </InputBlock>

                                <InputBlock>
                                    <Label>
                                        Кількість
                                    </Label>

                                    <Input
                                        placeholder={
                                            "0"
                                        }
                                    />
                                </InputBlock>

                                <InputBlock>
                                    <Label>
                                        Категорія
                                    </Label>

                                    <Select>
                                        {CATEGORIES.map(
                                            category => (
                                                <option
                                                    key={
                                                        category
                                                    }
                                                >
                                                    {
                                                        category
                                                    }
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </InputBlock>

                                <InputBlock full>
                                    <Label>
                                        Опис товару
                                    </Label>

                                    <Textarea
                                        placeholder={
                                            "Опис товару..."
                                        }
                                    />
                                </InputBlock>
                            </InputsGrid>
                        </Section>
                    </Left>

                    <Right>
                        <Section>
                            <SectionTop>
                                <SectionTitle>
                                    Характеристики
                                </SectionTitle>

                                <AddCharacteristicButton
                                    onClick={
                                        addCharacteristic
                                    }
                                >
                                    <Plus size={14} />

                                    Додати
                                </AddCharacteristicButton>
                            </SectionTop>

                            <Characteristics>
                                {characteristics.map(
                                    item => (
                                        <CharacteristicCard
                                            key={
                                                item.id
                                            }
                                        >
                                            <CharacteristicInputs>
                                                <Input
                                                    value={
                                                        item.key
                                                    }
                                                    onChange={e =>
                                                        updateCharacteristic(
                                                            item.id,
                                                            "key",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder={
                                                        "Назва"
                                                    }
                                                />

                                                <Input
                                                    value={
                                                        item.value
                                                    }
                                                    onChange={e =>
                                                        updateCharacteristic(
                                                            item.id,
                                                            "value",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder={
                                                        "Значення"
                                                    }
                                                />
                                            </CharacteristicInputs>

                                            <DeleteButton
                                                onClick={() =>
                                                    removeCharacteristic(
                                                        item.id
                                                    )
                                                }
                                            >
                                                <Trash2
                                                    size={
                                                        15
                                                    }
                                                />
                                            </DeleteButton>
                                        </CharacteristicCard>
                                    )
                                )}
                            </Characteristics>
                        </Section>

                        <Buttons>
                            <CancelButton
                                onClick={onClose}
                            >
                                Скасувати
                            </CancelButton>

                            <SaveButton>
                                Зберегти товар
                            </SaveButton>
                        </Buttons>
                    </Right>
                </Content>
            </Modal>
        </Overlay>
    );
};

export default ProductModal;

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 500;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: rgba(15,23,42,0.38);

    backdrop-filter: blur(8px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 1420px;

    height: calc(100vh - 48px);

    border-radius: 28px;

    background: white;

    border: 1px solid #e2e8f0;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.18);
`;

const Header = styled.div`
    min-height: 96px;

    padding: 10px 26px 0 26px;

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 6px;

    font-size: 14px;

    color: #64748b;
`;

const CloseButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 14px;

    border: 1px solid #e2e8f0;

    background: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Content = styled.div`
    flex: 1;

    display: grid;

    grid-template-columns: 2fr 1fr;

    min-height: 0;
`;

const Left = styled.div`
    overflow-y: auto;

    padding: 24px;

    border-right: 1px solid #edf2f7;

    box-sizing: border-box;
`;

const Right = styled.div`
    overflow-y: auto;

    padding: 24px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 26px;
`;

const SectionTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: 800;

    color: #0f172a;
`;

const UploadButton = styled.label`
    width: fit-content;

    height: 46px;

    margin-top: 18px;

    padding: 0 18px;

    border-radius: 14px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;
`;

const HiddenInput = styled.input`
    display: none;
`;

const ImagesGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));

    gap: 14px;

    margin-top: 18px;
`;

const ImageCard = styled.div`
    position: relative;

    aspect-ratio: 1 / 1;

    border-radius: 18px;

    overflow: hidden;

    border: 1px solid #e2e8f0;

    background: #f8fafc;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
`;

const RemoveImageButton = styled.button`
    position: absolute;

    top: 10px;
    right: 10px;

    width: 32px;
    height: 32px;

    border-radius: 10px;

    border: none;

    background: rgba(15,23,42,0.74);

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const InputsGrid = styled.div`
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 16px;

    margin-top: 18px;
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

    height: 48px;

    padding: 0 14px;

    border-radius: 14px;

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

const Select = styled.select`
    width: 100%;

    height: 48px;

    padding: 0 14px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;

    box-sizing: border-box;
`;

const Textarea = styled.textarea`
    width: 100%;

    min-height: 160px;

    resize: vertical;

    padding: 14px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;
    line-height: 1.7;

    box-sizing: border-box;
`;

const AddCharacteristicButton = styled.button`
    height: 36px;

    padding: 0 14px;

    border: none;
    border-radius: 12px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 13px;
    font-weight: 800;

    cursor: pointer;
`;

const Characteristics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 18px;
`;

const CharacteristicCard = styled.div`
    padding: 12px;

    border-radius: 16px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    gap: 12px;
`;

const CharacteristicInputs = styled.div`
    flex: 1;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 10px;
`;

const DeleteButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    border: none;

    background: rgba(239,68,68,0.10);

    color: #ef4444;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;

    margin-top: 24px;
`;

const CancelButton = styled.button`
    flex: 1;

    height: 50px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: white;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;
`;

const SaveButton = styled.button`
    flex: 1;

    height: 50px;

    border: none;
    border-radius: 16px;

    background:
            linear-gradient(
                    135deg,
                    #16a34a 0%,
                    #22c55e 100%
            );

    color: white;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 14px 28px rgba(34,197,94,0.22);
`;