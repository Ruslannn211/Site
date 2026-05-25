import {type FC} from "react";
import styled from "styled-components";
import {Star} from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        name: "Олександр",
        rating: 5,
        text: "Дуже швидка доставка та якісний товар. Все прийшло добре запаковане.",
        date: "12 травня 2026",
    },

    {
        id: 2,
        name: "Марина",
        rating: 4,
        text: "Магазин сподобався, підтримка відповідає швидко. Єдине — доставка затрималась на день.",
        date: "8 травня 2026",
    },

    {
        id: 3,
        name: "Іван",
        rating: 5,
        text: "Замовляю вже не вперше. Ціни приємні, товар оригінальний.",
        date: "3 травня 2026",
    },

    {
        id: 4,
        name: "Катерина",
        rating: 5,
        text: "Все супер. Ноутбук працює ідеально, магазин рекомендую.",
        date: "29 квітня 2026",
    },

    {
        id: 5,
        name: "Катерина",
        rating: 5,
        text: "Все супер. Ноутбук працює ідеально, магазин рекомендую.",
        date: "29 квітня 2026",
    },

    {
        id: 6,
        name: "Катерина",
        rating: 5,
        text: "Все супер. Ноутбук працює ідеально, магазин рекомендую.",
        date: "29 квітня 2026",
    },
];

const ReviewsComponent: FC = () => {
    const average =
        REVIEWS.reduce(
            (acc, review) => acc + review.rating,
            0
        ) / REVIEWS.length;

    const stars = [5, 4, 3, 2, 1];

    return (
        <Container>
            <Left>
                <StatsCard>
                    <StatsTop>
                        <AverageValue>
                            {average.toFixed(1)}
                        </AverageValue>

                        <StarsRow>
                            {Array.from({
                                length: 5,
                            }).map((_, index) => (
                                <StyledStar
                                    key={index}
                                    size={18}
                                    filled={
                                        index <
                                        Math.round(
                                            average
                                        )
                                    }
                                />
                            ))}
                        </StarsRow>

                        <ReviewsCount>
                            {REVIEWS.length} відгуків
                        </ReviewsCount>
                    </StatsTop>

                    <RatingList>
                        {stars.map(star => {
                            const count =
                                REVIEWS.filter(
                                    review =>
                                        review.rating ===
                                        star
                                ).length;

                            const percent =
                                (count /
                                    REVIEWS.length) *
                                100;

                            return (
                                <RatingRow
                                    key={star}
                                >
                                    <RatingLabel>
                                        {star}
                                        <Star
                                            size={13}
                                            fill="#facc15"
                                            color="#facc15"
                                        />
                                    </RatingLabel>

                                    <RatingBar>
                                        <RatingProgress
                                            width={
                                                percent
                                            }
                                        />
                                    </RatingBar>

                                    <RatingCount>
                                        {count}
                                    </RatingCount>
                                </RatingRow>
                            );
                        })}
                    </RatingList>
                </StatsCard>
            </Left>

            <Right>
                <RightHeader>
                    Відгуки покупців
                </RightHeader>

                <ReviewsList>
                    {REVIEWS.map(review => (
                        <ReviewCard
                            key={review.id}
                        >
                            <ReviewTop>
                                <ReviewUser>
                                    <Avatar>
                                        {review.name[0]}
                                    </Avatar>

                                    <UserInfo>
                                        <UserName>
                                            {
                                                review.name
                                            }
                                        </UserName>

                                        <ReviewDate>
                                            {
                                                review.date
                                            }
                                        </ReviewDate>
                                    </UserInfo>
                                </ReviewUser>

                                <StarsRow>
                                    {Array.from({
                                        length: 5,
                                    }).map(
                                        (
                                            _,
                                            index
                                        ) => (
                                            <StyledStar
                                                key={
                                                    index
                                                }
                                                size={
                                                    15
                                                }
                                                filled={
                                                    index <
                                                    review.rating
                                                }
                                            />
                                        )
                                    )}
                                </StarsRow>
                            </ReviewTop>

                            <ReviewText>
                                {review.text}
                            </ReviewText>
                        </ReviewCard>
                    ))}
                </ReviewsList>
            </Right>
        </Container>
    );
};

export default ReviewsComponent;

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1380px;
    min-height: 300px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 18px;
    align-items: start;
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: 0 6px 20px rgba(15,23,42,0.04);
    border-radius: 18px;
    padding: 35px 22px;
    margin-top: 10px;
`;

const Left = styled.div`
    position: relative;
    top: 0;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
`;

const StatsCard = styled.div`
    position: sticky;
    top: 0;
    padding: 24px;
    box-sizing: border-box;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const StatsTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AverageValue = styled.div`
    font-size: 64px;
    font-weight: 900;

    letter-spacing: -0.08em;

    color: #0f172a;
    margin-top: 20px;
`;

const StarsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 20px;
`;

const ReviewsCount = styled.div`
    margin-top: 5px;

    font-size: 14px;
    font-weight: 600;

    color: #64748b;
`;

const RatingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;

    margin-top: 28px;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const RatingLabel = styled.div`
    width: 42px;

    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 13px;
    font-weight: 700;

    color: #0f172a;
`;

const RatingBar = styled.div`
    flex: 1;

    height: 8px;

    border-radius: 999px;

    overflow: hidden;

    background: #e2e8f0;
`;

const RatingProgress = styled.div<{ width: number }>`
    width: ${({ width }) => width}%;

    height: 100%;

    border-radius: 999px;

    background:
            linear-gradient(
                    90deg,
                    #facc15 0%,
                    #f59e0b 100%
            );
`;

const RatingCount = styled.div`
    width: 20px;

    text-align: right;

    font-size: 13px;
    font-weight: 700;

    color: #64748b;
`;

const RightHeader = styled.div`
    font-size: 28px;
    font-weight: 900;

    letter-spacing: -0.05em;

    color: #0f172a;
`;

const ReviewsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    margin-top: 20px;
`;

const ReviewCard = styled.div`
    padding: 20px;

    border-radius: 18px;

    background: #f8fafc;

    border: 1px solid #edf2f7;
`;

const ReviewTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const ReviewUser = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const Avatar = styled.div`
    width: 48px;
    height: 48px;

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
    justify-content: center;

    font-size: 18px;
    font-weight: 900;

    box-shadow:
            0 10px 20px rgba(34,197,94,0.18);
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.div`
    font-size: 15px;
    font-weight: 800;

    color: #0f172a;
`;

const ReviewDate = styled.div`
    margin-top: 4px;

    font-size: 12px;

    color: #94a3b8;
`;

const ReviewText = styled.div`
    margin-top: 18px;

    font-size: 14px;
    line-height: 1.8;

    color: #475569;
`;

const StyledStar = styled(Star)<{
    filled?: boolean;
}>`
    color: ${({ filled }) =>
    filled ? "#facc15" : "#cbd5e1"};

    fill: ${({ filled }) =>
    filled ? "#facc15" : "transparent"};
`;