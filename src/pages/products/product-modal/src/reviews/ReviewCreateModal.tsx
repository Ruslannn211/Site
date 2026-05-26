import {type FC, useState} from "react";

import styled from "styled-components";

import {
    Send,
    Star,
    X,
} from "lucide-react";
import useCreateRating from "@hooks/useCreateRating.tsx";
import Spinner from "@components/ui/Spinner.tsx";
import type {ProductRatingType} from "@types-lib";

interface Props {
    open: boolean;
    onClose: () => void;
    productId: number;
    addRating: (r: ProductRatingType) => void;
}

const ReviewCreateModal: FC<Props> = (props) => {
    const {open, onClose, productId, addRating} = props;
    const [rating, setRating] = useState<1|2|3|4|5>(5);
    const [comment, setComment] = useState("");

    const {handle, loading} = useCreateRating(productId);
    const submit = async () => {
        const response = await handle(rating, comment);
        if (response) {
            addRating(response);
            onClose();
        }
    }

    return (
        <Overlay
            $open={open}
            onClick={onClose}
        >
            <Modal
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                <CloseButton
                    onClick={onClose}
                >
                    <X size={18} />
                </CloseButton>

                <Title>
                    Написати відгук
                </Title>

                <Description>
                    Поділіться своєю
                    думкою про товар
                </Description>

                <RatingBlock>
                    {Array.from({
                        length: 5,
                    }).map((_, index: any) => (
                        <StarButton
                            key={index}
                            onClick={() => setRating(index + 1)}
                        >
                            <StyledStar
                                size={32}
                                filled={
                                    index <
                                    rating
                                }
                            />
                        </StarButton>
                    ))}
                </RatingBlock>

                <Textarea
                    placeholder={
                        "Напишіть ваш відгук..."
                    }
                    value={comment}
                    onChange={e =>
                        setComment(
                            e.target.value
                        )
                    }
                />

                <SubmitButton disabled={loading} onClick={submit}>
                    <Send size={16} />
                    {loading ? <Spinner /> : "Відправити"}
                </SubmitButton>
            </Modal>
        </Overlay>
    );
};

export default ReviewCreateModal;

const Overlay = styled.div<{
    $open?: boolean;
}>`
    position: fixed;

    inset: 0;

    z-index: 500;

    background: rgba(15,23,42,0.42);

    backdrop-filter: blur(6px);

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: ${({ $open }) =>
    $open ? 1 : 0};

    pointer-events: ${({ $open }) =>
    $open
        ? "all"
        : "none"};

    transition: 0.18s ease;
`;

const Modal = styled.div`
    width: 100%;
    max-width: 520px;

    padding: 28px;

    border-radius: 24px;

    background: white;

    border: 1px solid #e2e8f0;

    position: relative;

    box-shadow:
            0 30px 60px rgba(15,23,42,0.18);

    box-sizing: border-box;
`;

const CloseButton = styled.button`
    position: absolute;

    top: 18px;
    right: 18px;

    width: 38px;
    height: 38px;

    border-radius: 12px;

    border: none;

    background: #f1f5f9;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const Description = styled.div`
    margin-top: 10px;

    font-size: 14px;

    color: #64748b;
`;

const RatingBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 28px;
`;

const StarButton = styled.button`
    border: none;

    background: transparent;

    padding: 0;

    cursor: pointer;
`;

const StyledStar = styled(Star)<{
    filled?: boolean;
}>`
    color: ${({ filled }) =>
    filled ? "#facc15" : "#cbd5e1"};

    fill: ${({ filled }) =>
    filled ? "#facc15" : "transparent"};

    transition: 0.14s ease;
`;

const Textarea = styled.textarea`
    width: 100%;

    min-height: 160px;

    margin-top: 24px;
    font-family: var(--font-ui);

    padding: 16px;

    border-radius: 12px;

    border: 1px solid #dbe4ee;

    background: #f8fafc;

    outline: none;

    resize: vertical;

    font-size: 14px;
    line-height: 1.7;

    color: #0f172a;

    box-sizing: border-box;

    transition: 0.16s ease;

    &:focus {
        background: white;

        border-color: #94a3b8;
    }

    &::placeholder {
        color: #94a3b8;
    }
`;

const SubmitButton = styled.button`
    width: 100%;

    height: 54px;

    margin-top: 24px;

    border: none;
    border-radius: 18px;

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
    gap: 10px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 14px 28px rgba(34,197,94,0.22);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;