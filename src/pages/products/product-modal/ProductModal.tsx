import {type FC, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    ShieldCheck,
    ShoppingCart,
    Star,
    Truck,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import useProductOpen from "@pages/products/product-modal/hooks/useProductOpen.tsx";
import {useNavigate} from "react-router-dom";

interface Props {

}

const images = [
    "https://gstore.ua/content/images/12/950x950l85ml0/apple-macbook-air-13-m3-8512gb-space-gray-mrxp3-33731516750395.jpg",
    "https://gstore.ua/content/images/12/950x730l85ml0/apple-macbook-air-13-m3-8512gb-space-gray-mrxp3-97403376808474.jpg",
    "https://gstore.ua/content/images/12/950x730l85ml0/apple-macbook-air-13-m3-8512gb-space-gray-mrxp3-71293849155537.jpg",
    "https://gstore.ua/content/images/12/950x730l85ml0/apple-macbook-air-13-m3-8512gb-space-gray-mrxp3-50835503081054.jpg",
    "https://gstore.ua/content/images/12/950x730l85ml0/apple-macbook-air-13-m3-8512gb-space-gray-mrxp3-43680260976899.jpg",
];

const ProductPage: FC<Props> = () => {
    const {product} = useProductOpen();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && product) {
                navigate("/products")
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [product]);

    const [currentImage, setCurrentImage] = useState(0);
    const [zoomVisible, setZoomVisible] = useState(false);

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
        <Container open={!!product}>
            <Content>
                <TopTabs>
                    <BackButton onClick={() => navigate("/products")}>
                        <ArrowLeft size={16} />
                        Назад
                    </BackButton>

                    <Tabs>
                        <Tab active>
                            Про товар
                        </Tab>

                        <Tab>
                            Характеристики
                        </Tab>

                        <Tab>
                            Відгуки та питання
                        </Tab>
                    </Tabs>
                </TopTabs>

                <Grid>
                    <Left>
                        <ImageWrapper
                            ref={imageRef}
                            onMouseEnter={() => setZoomVisible(true)}
                            onMouseLeave={() => setZoomVisible(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <MainImage
                                src={images[currentImage]}
                                ref={imgRef}
                                alt={"product"}
                            />

                            <ZoomLens
                                visible={zoomVisible}
                                style={{
                                    left: lensPosition.x - 70,
                                    top: lensPosition.y - 70,
                                }}
                            />

                            <ImageControls>
                                <ImageControlButton
                                    onClick={() =>
                                        setCurrentImage(prev =>
                                            prev === 0
                                                ? images.length - 1
                                                : prev - 1
                                        )
                                    }
                                >
                                    <ChevronLeft size={18} />
                                </ImageControlButton>

                                <ImageControlButton
                                    onClick={() =>
                                        setCurrentImage(prev =>
                                            prev === images.length - 1
                                                ? 0
                                                : prev + 1
                                        )
                                    }
                                >
                                    <ChevronRight size={18} />
                                </ImageControlButton>
                            </ImageControls>
                        </ImageWrapper>

                        <Thumbs>
                            {images.map((image, index) => (
                                <Thumb
                                    key={image}
                                    active={currentImage === index}
                                    onClick={() => setCurrentImage(index)}
                                >
                                    <ThumbImage
                                        src={image}
                                        alt={"thumb"}
                                    />
                                </Thumb>
                            ))}
                        </Thumbs>
                    </Left>

                    <Right>
                        <ZoomContainer visible={zoomVisible}>
                            <ZoomedImage
                                style={{
                                    backgroundImage: `url(${images[currentImage]})`,
                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                }}
                            />
                        </ZoomContainer>

                        <StatusRow>
                            <Status>
                                Є в наявності
                            </Status>

                            <Code>
                                Код: TP-19424
                            </Code>
                        </StatusRow>

                        <Title>
                            Apple MacBook Air 13 M3 16GB 512GB Space Gray
                        </Title>

                        <RatingRow>
                            <Stars>
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarFill />
                            </Stars>

                            <RatingValue>
                                4.9
                            </RatingValue>

                            <Reviews>
                                <MessageCircle size={13} />

                                284 відгуки
                            </Reviews>
                        </RatingRow>

                        <PriceSection>
                            <OldPrice>
                                68 999 ₴
                            </OldPrice>

                            <PriceRow>
                                <CurrentPrice>
                                    62 999 ₴
                                </CurrentPrice>

                                <Discount>
                                    -9%
                                </Discount>
                            </PriceRow>
                        </PriceSection>

                        <Description>
                            Потужний ноутбук на базі Apple M3 для роботи,
                            навчання та професійних задач. Висока
                            автономність, преміальний дисплей та безшумна
                            система охолодження.
                        </Description>

                        <Characteristics>
                            <Characteristic>
                                <Label>
                                    Дисплей
                                </Label>

                                <Value>
                                    13.6" Liquid Retina
                                </Value>
                            </Characteristic>

                            <Characteristic>
                                <Label>
                                    Процесор
                                </Label>

                                <Value>
                                    Apple M3
                                </Value>
                            </Characteristic>

                            <Characteristic>
                                <Label>
                                    Оперативна памʼять
                                </Label>

                                <Value>
                                    16 GB
                                </Value>
                            </Characteristic>

                            <Characteristic>
                                <Label>
                                    Накопичувач
                                </Label>

                                <Value>
                                    SSD 512 GB
                                </Value>
                            </Characteristic>
                        </Characteristics>

                        <ButtonsRow>
                            <BuyButton>
                                <ShoppingCart size={18} />

                                Замовити товар
                            </BuyButton>

                            <FavoriteButton>
                                <Heart size={18} />
                            </FavoriteButton>
                        </ButtonsRow>

                        <Advantages>
                            <Advantage>
                                <AdvantageIcon>
                                    <Truck size={16} />
                                </AdvantageIcon>

                                <AdvantageText>
                                    Безкоштовна доставка
                                </AdvantageText>
                            </Advantage>

                            <Advantage>
                                <AdvantageIcon>
                                    <ShieldCheck size={16} />
                                </AdvantageIcon>

                                <AdvantageText>
                                    Гарантія 12 місяців
                                </AdvantageText>
                            </Advantage>
                        </Advantages>
                    </Right>
                </Grid>
            </Content>
        </Container>
    );
};

export default ProductPage;

const Content = styled.div`
    width: 100%;
    max-width: 1380px;

    margin: 0 auto;

    padding: 16px;

    box-sizing: border-box;
`;

const TopTabs = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    margin-bottom: 10px;

    min-height: 64px;
    z-index: 2;

    padding: 10px 16px;

    border-radius: 16px;

    background: white;

    border: 1px solid #e5e7eb;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    box-sizing: border-box;

    box-shadow:
            0 4px 14px rgba(15,23,42,0.04);
`;

const BackButton = styled.button`
    height: 42px;

    padding: 0 16px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background:
            linear-gradient(
                    180deg,
                    #ffffff 0%,
                    #f8fafc 100%
            );

    color: #0f172a;

    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    flex-shrink: 0;

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);

        border-color: #cbd5e1;

        box-shadow:
                0 8px 16px rgba(15,23,42,0.06);
    }
`;

const Tabs = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    flex-wrap: wrap;
`;

const Tab = styled.button<{ active?: boolean }>`
    position: relative;

    height: 36px;

    padding: 0 16px;

    border: none;
    border-radius: 12px;

    background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.10)"
        : "transparent"};

    color: ${({ active }) =>
    active
        ? "#16a34a"
        : "#0f172a"};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: ${({ active }) =>
    active ? 800 : 700};

    white-space: nowrap;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: ${({ active }) =>
    active
        ? "rgba(34,197,94,0.10)"
        : "#f8fafc"};
    }

    &::after {
        content: "";

        position: absolute;

        left: 14px;
        right: 14px;
        bottom: 6px;

        height: 2px;

        border-radius: 999px;

        background: ${({ active }) =>
    active
        ? "#22c55e"
        : "transparent"};

        transition: 0.16s ease;
    }
`;

const Grid = styled.div`
    display: grid;

    grid-template-columns: 480px 1fr;

    gap: 18px;

    align-items: start;
`;

const Left = styled.div`
    position: sticky;
    top: 16px;
`;

const ImageWrapper = styled.div`
    position: relative;
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

    box-shadow:
            0 8px 18px rgba(15,23,42,0.10);
`;

const Thumbs = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 12px;
`;

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

const ZoomLens = styled.div<{ visible: boolean }>`
    position: absolute;

    width: 140px;
    height: 140px;

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
    left: 22px;
    width: calc(100% - 44px);

    height: calc(100% - 44px);

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

const Right = styled.div`
    position: relative;
    background: white;

    border: 1px solid #e2e8f0;

    border-radius: 14px;

    padding: 22px;

    box-shadow:
            0 6px 20px rgba(15,23,42,0.04);

    box-sizing: border-box;
`;

const StatusRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Status = styled.div`
    height: 28px;

    padding: 0 10px;

    border-radius: 999px;

    background: rgba(34,197,94,0.12);

    color: #16a34a;

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const Code = styled.div`
    font-size: 12px;
    font-weight: 600;

    color: #94a3b8;
`;

const Title = styled.div`
    margin-top: 14px;

    font-size: 28px;
    font-weight: 900;

    line-height: 1.14;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 5px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StarFill = styled(Star)`
    width: 16px;
    height: 16px;

    fill: #f59e0b;
    color: #f59e0b;
`;

const RatingValue = styled.div`
    font-size: 13px;
    font-weight: 800;

    color: #0f172a;
`;

const Reviews = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const PriceSection = styled.div`
    margin-top: 10px;
`;

const OldPrice = styled.div`
    font-size: 18px;
    font-weight: 700;

    color: #94a3b8;

    text-decoration: line-through;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-top: 5px;
`;

const CurrentPrice = styled.div`
    font-size: 40px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #ef4444;
`;

const Discount = styled.div`
    height: 28px;

    padding: 0 10px;

    border-radius: 999px;

    background: #ef4444;

    color: white;

    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 800;
`;

const Description = styled.div`
    margin-top: 22px;

    font-size: 14px;
    line-height: 1.7;

    color: #475569;
`;

const Characteristics = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin-top: 24px;
`;

const Characteristic = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 10px;

    border-bottom: 1px solid #edf2f7;
`;

const Label = styled.div`
    font-size: 13px;
    font-weight: 600;

    color: #64748b;
`;

const Value = styled.div`
    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const ButtonsRow = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 28px;
`;

const BuyButton = styled.button`
    flex: 1;

    height: 50px;

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
    justify-content: center;
    gap: 8px;

    font-size: 14px;
    font-weight: 800;

    cursor: pointer;

    box-shadow:
            0 10px 22px rgba(34,197,94,0.22);

    transition: 0.16s ease;

    &:hover {
        transform: translateY(-1px);
    }
`;

const FavoriteButton = styled.button`
    width: 50px;
    height: 50px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

    background: white;

    color: #f59e0b;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: 0.16s ease;

    &:hover {
        background: #f8fafc;
    }
`;

const Advantages = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 22px;
`;

const Advantage = styled.div`
    flex: 1;

    padding: 14px;

    border-radius: 12px;

    background: #f8fafc;

    border: 1px solid #edf2f7;

    display: flex;
    align-items: center;
    gap: 10px;
`;

const AdvantageIcon = styled.div`
    width: 32px;
    height: 32px;

    min-width: 32px;

    border-radius: 10px;

    background: white;

    border: 1px solid #e2e8f0;

    color: #0f172a;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const AdvantageText = styled.div`
    font-size: 12px;
    font-weight: 700;

    color: #0f172a;
`;

const Container = styled.div<{ open: boolean }>`
    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 80;

    background: #f8fafc;

    overflow-y: auto;

    opacity: ${({ open }) =>
            open ? 1 : 0};

    pointer-events: ${({ open }) =>
            open ? "all" : "none"};

    transition: opacity 0.24s ease;

    box-sizing: border-box;
`;