import {type FC} from "react";
import styled from "styled-components";
import {
    FolderTree,
    Save,
    X,
} from "lucide-react";

interface Props {
    open: boolean;
    onClose?: () => void;
}

const CategoryModal: FC<Props> = ({
                                      open,
                                      onClose,
                                  }) => {
    return (
        <Overlay open={open}>
            <Modal>
                <Header>
                    <HeaderLeft>
                        <HeaderIcon>
                            <FolderTree size={18} />
                        </HeaderIcon>

                        <HeaderInfo>
                            <Title>
                                Нова категорія
                            </Title>

                            <Description>
                                Створення категорії товарів
                            </Description>
                        </HeaderInfo>
                    </HeaderLeft>

                    <CloseButton
                        onClick={onClose}
                    >
                        <X size={18} />
                    </CloseButton>
                </Header>

                <Content>
                    <InputBlock>
                        <Label>
                            Назва категорії
                        </Label>

                        <Input
                            placeholder={
                                "Наприклад Смартфони"
                            }
                        />
                    </InputBlock>

                    <InputBlock>
                        <Label>
                            Опис категорії
                        </Label>

                        <Textarea
                            placeholder={
                                "Короткий опис категорії..."
                            }
                        />
                    </InputBlock>
                </Content>

                <Footer>
                    <CancelButton
                        onClick={onClose}
                    >
                        Скасувати
                    </CancelButton>

                    <SaveButton>
                        <Save size={16} />

                        Зберегти
                    </SaveButton>
                </Footer>
            </Modal>
        </Overlay>
    );
};

export default CategoryModal;

const Overlay = styled.div<{ open: boolean }>`
    position: fixed;

    inset: 0;

    z-index: 500;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    background: rgba(15,23,42,0.34);

    backdrop-filter: blur(6px);

    opacity: ${({ open }) => open ? 1 : 0};

    pointer-events: ${({ open }) =>
    open ? "all" : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 520px;

    border-radius: 26px;

    background: white;

    border: 1px solid #e2e8f0;

    overflow: hidden;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.18);
`;

const Header = styled.div`
    min-height: 86px;

    padding: 0 24px;

    border-bottom: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const HeaderIcon = styled.div`
    width: 48px;
    height: 48px;

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

    box-shadow:
            0 12px 24px rgba(34,197,94,0.20);
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 4px;

    font-size: 13px;

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
    padding: 24px;

    display: flex;
    flex-direction: column;
    gap: 18px;

    box-sizing: border-box;
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

const Input = styled.input`
    width: 100%;

    height: 50px;

    padding: 0 16px;

    border-radius: 16px;

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

const Textarea = styled.textarea`
    width: 100%;

    min-height: 120px;

    resize: vertical;

    padding: 14px 16px;

    border-radius: 16px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    font-size: 14px;
    line-height: 1.7;

    box-sizing: border-box;

    transition: 0.16s ease;

    &:focus {
        background: white;

        border-color: #94a3b8;
    }
`;

const Footer = styled.div`
    padding: 20px 24px;

    border-top: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;

    box-sizing: border-box;
`;

const CancelButton = styled.button`
    height: 46px;

    padding: 0 18px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;

    background: white;

    color: #0f172a;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;
`;

const SaveButton = styled.button`
    height: 46px;

    padding: 0 20px;

    border: none;
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

    box-shadow:
            0 14px 28px rgba(34,197,94,0.22);
`;