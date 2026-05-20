import {type FC, useRef, useState} from "react";
import styled from "styled-components";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import type {ProductType} from "@types-lib";
import useProductImage from "@hooks/useProductImage.tsx";
import ImageThumb from "@pages/products/product-modal/src/ImageThumb.tsx";

interface Props {
    product: ProductType;
}

const ImagesWrapper: FC<Props> = (props) => {
    const {product} = props;

    const [currentImage, setCurrentImage] = useState(0);
    const [zoomVisible, setZoomVisible] = useState(false);

    const image = useProductImage(product.images[currentImage]);

    const [zoomPosition, setZoomPosition] = useState({
        x: 0,
        y: 0,
    });

    const [lensPosition, setLensPosition] = useState({
        x: 0,
        y: 0,
    });
    const imageRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        const target = e.target as HTMLElement;

        if (target.closest("button")) {
            setZoomVisible(false);
            return;
        }

        if (!imageRef.current || !imgRef.current) return;

        const wrapperRect =
            imageRef.current.getBoundingClientRect();

        const imgRect =
            imgRef.current.getBoundingClientRect();

        // координаты мышки относительно КАРТИНКИ
        const x = e.clientX - imgRect.left;
        const y = e.clientY - imgRect.top;

        // если мышка вне картинки
        if (
            x < 0 ||
            y < 0 ||
            x > imgRect.width ||
            y > imgRect.height
        ) {
            setZoomVisible(false);
            return;
        }

        setZoomVisible(true);

        const percentX =
            (x / imgRect.width) * 100;

        const percentY =
            (y / imgRect.height) * 100;

        setZoomPosition({
            x: percentX,
            y: percentY,
        });

        // позиция lens относительно wrapper
        setLensPosition({
            x: e.clientX - wrapperRect.left,
            y: e.clientY - wrapperRect.top,
        });
    };

    return (
        <Container>
            <Wrapper
                ref={imageRef}
                onMouseEnter={() => setZoomVisible(true)}
                onMouseLeave={() => setZoomVisible(false)}
                onMouseMove={handleMouseMove}
            >
                <MainImage
                    src={image}
                    ref={imgRef}
                    alt={"product"}
                />

                <ZoomLens
                    visible={zoomVisible}
                    style={{
                        left: lensPosition.x - 110,
                        top: lensPosition.y - 90,
                    }}
                />

                <ImageControls>
                    <ImageControlButton
                        onMouseEnter={e => e.stopPropagation()}
                        onClick={() =>
                            setCurrentImage(prev =>
                                prev === 0
                                    ? product.images.length - 1
                                    : prev - 1
                            )
                        }
                    >
                        <ChevronLeft size={18} />
                    </ImageControlButton>

                    <ImageControlButton
                        onMouseEnter={e => e.stopPropagation()}
                        onClick={() =>
                            setCurrentImage(prev =>
                                prev === product.images.length - 1
                                    ? 0
                                    : prev + 1
                            )
                        }
                    >
                        <ChevronRight size={18} />
                    </ImageControlButton>
                </ImageControls>
            </Wrapper>
            <Thumbs>
                {product.images.map((filename, index) => (
                    <ImageThumb
                        key={filename}
                        filename={filename}
                        active={currentImage === index}
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </Thumbs>
            <ZoomContainer visible={zoomVisible}>
                <ZoomedImage
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                />
            </ZoomContainer>
        </Container>
    );
};

export default ImagesWrapper;

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    aspect-ratio: 1 / 1;

    width: 100%;

    border-radius: 14px;

    background: white;

    border: 1px solid #e2e8f0;

    overflow: hidden;

    box-shadow:
            0 6px 20px rgba(15,23,42,0.04);
`;

const MainImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: contain;

    padding: 24px;

    box-sizing: border-box;
    pointer-events: none;
`;

const ImageControls = styled.div`
    position: absolute;

    left: 14px;
    right: 14px;
    top: 50%;

    transform: translateY(-50%);

    display: flex;
    justify-content: space-between;
    pointer-events: none;
`;

const ImageControlButton = styled.button`
    width: 38px;
    height: 38px;

    border: none;
    border-radius: 10px;

    background: rgba(255,255,255,0.94);

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #0f172a;
    pointer-events: all;

    box-shadow:
            0 8px 18px rgba(15,23,42,0.10);
`;

const ZoomLens = styled.div<{ visible: boolean }>`
    position: absolute;

    width: 220px;
    height: 180px;

    border-radius: 14px;

    background: rgba(255,255,255,0.22);

    border: 1px solid rgba(255,255,255,0.7);

    backdrop-filter: blur(2px);

    pointer-events: none;

    opacity: ${({ visible }) =>
    visible ? 1 : 0};

    transition: opacity 0.12s ease;

    z-index: 4;

    box-shadow:
            0 8px 20px rgba(15,23,42,0.10);
`;

const ZoomContainer = styled.div<{ visible: boolean }>`
    position: absolute;

    top: 22px;
    right: 18px;
    width: 60%;

    height: 70%;

    max-height: calc(100vw - 44px);

    aspect-ratio: 1 / 1;
    
    overflow: hidden;

    background: white;

    border-radius: 14px;

    z-index: ${({ visible }) =>
    visible ? 1 : -1};

    opacity: ${({ visible }) =>
    visible ? 1 : 0};

    transition: opacity 100ms ease;

    box-sizing: border-box;
`;

const ZoomedImage = styled.div`
    width: 100%;
    height: 100%;

    background-repeat: no-repeat;

    background-size: 180%;

    will-change: background-position;

    transition:
            background-position 0.03s linear;
`;

const Thumbs = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 12px;
`;