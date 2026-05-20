import styled from "styled-components";
import useProductImage from "@hooks/useProductImage.tsx";

interface ProductThumbProps {
    filename: string;
    active: boolean;
    onClick: () => void;
}

const ImageThumb = (props: ProductThumbProps) => {
    const {filename, active, onClick} = props;
    const image = useProductImage(filename);

    return (
        <Thumb
            active={active}
            onClick={onClick}
        >
            <ThumbImage
                src={image}
                alt={"thumb"}
            />
        </Thumb>
    );
};

export default ImageThumb;

const Thumb = styled.button<{ active: boolean }>`
    width: 74px;
    height: 74px;

    border-radius: 12px;

    overflow: hidden;

    padding: 0;

    background: white;

    border: 2px solid ${({ active }) =>
    active ? "#111827" : "#e2e8f0"};

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        border-color: #94a3b8;
    }
`;

const ThumbImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: contain;

    padding: 8px;

    box-sizing: border-box;
`;