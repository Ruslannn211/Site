import {type FC, useState} from "react";
import styled from "styled-components";
import {Star} from "lucide-react";
import type {ProductRatingType, ProductType} from "@types-lib";
import {buildClientName} from "@helpers/buildClientName.ts";
import {useStore} from "@store";
import ReviewCreateModal from "@pages/products/product-modal/src/reviews/ReviewCreateModal.tsx";
import {buildFormatDateTime} from "@helpers/buildFormatDateTime.ts";

interface Props {
    product: ProductType;
    addRating: (r: ProductRatingType) => void;
}

const ReviewsComponent: FC<Props> = (props) => {
    const {product, addRating} = props;

    const {user} = useStore(store => store.global.user);
    const [open, setOpen] = useState(false);

    const averageNum = product.ratings.reduce((acc, review) => acc + review.rating, 0);
    const average = averageNum === 0 ? 0 : (averageNum / product.ratings.length);
    const stars = [5, 4, 3, 2, 1];

    return (
        <>
            <Container>
                <Left>
                    <StatsCard>
                        <StatsTop>
                            <AverageValue>
                                {average.toFixed(1)}
                            </AverageValue>

                            <StarsRow>
                                {Array.from({length: 5,}).map((_, index) => (
                                    <StyledStar key={index} size={18} filled={index < Math.round(average)}/>
                                ))}
                            </StarsRow>

                            <ReviewsCount>
                                {product.ratings.length} відгуків
                            </ReviewsCount>
                        </StatsTop>

                        <RatingList>
                            {stars.map(star => {
                                const count = product.ratings.filter(review => review.rating === star).length;
                                const percent = count === 0 ? 0 : (count / product.ratings.length) * 100;

                                return (
                                    <RatingRow key={star}>
                                        <RatingLabel>
                                            {star}
                                            <Star size={13} fill="#facc15" color="#facc15"/>
                                        </RatingLabel>

                                        <RatingBar>
                                            <RatingProgress width={percent}/>
                                        </RatingBar>
                                        <RatingCount>{count}</RatingCount>
                                    </RatingRow>
                                );
                            })}
                        </RatingList>
                    </StatsCard>
                </Left>

                <Right>
                    <RightTop>
                        <RightHeader>Відгуки покупців</RightHeader>

                        <WriteButton disabled={!user} onClick={() => setOpen(true)}>
                            {user ? "Написати відгук" : "Авторизуйтесь, щоб залишити відгук"}
                        </WriteButton>
                    </RightTop>

                    <ReviewsList>
                        {product.ratings.length === 0 && (
                            <EmptyReviews />
                        )}
                        {product.ratings.map(review => (
                            <ReviewCard key={review.id}>
                                <ReviewTop>
                                    <ReviewUser>
                                        <Avatar>
                                            {review.user.first_name[0]}
                                        </Avatar>

                                        <UserInfo>
                                            <UserName>{buildClientName(review.user)}</UserName>
                                            <ReviewDate>{buildFormatDateTime(review.createdAt)}</ReviewDate>
                                        </UserInfo>
                                    </ReviewUser>

                                    <StarsRow>
                                        {Array.from({
                                            length: 5,
                                        }).map((_, index) => (
                                                <StyledStar key={index} size={15} filled={index < review.rating}/>
                                            )
                                        )}
                                    </StarsRow>
                                </ReviewTop>

                                <ReviewText>
                                    {review.comment ?? ""}
                                </ReviewText>
                            </ReviewCard>
                        ))}
                    </ReviewsList>
                </Right>
            </Container>
            <ReviewCreateModal open={open} onClose={() => setOpen(false)}
                               productId={product.id} addRating={addRating}
            />
        </>
    );
};

export default ReviewsComponent;

const EmptyReviews = () => {
    return (
        <EmptyWrapper>
            <EmptyIcon>
                <Star size={34}/>
            </EmptyIcon>

            <EmptyTitle>
                Відгуків поки немає
            </EmptyTitle>

            <EmptyText>
                Станьте першим покупцем, який поділиться своїм враженням про цей товар.
            </EmptyText>
        </EmptyWrapper>
    );
};

const EmptyWrapper = styled.div`
    width: 100%;

    padding: 42px 28px;

    border-radius: 22px;

    background: linear-gradient(
            180deg,
            #ffffff 0%,
            #f8fafc 100%
    );

    border: 1px solid #e2e8f0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    box-sizing: border-box;
`;

const EmptyIcon = styled.div`
    width: 78px;
    height: 78px;

    border-radius: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(
            135deg,
            rgba(250, 204, 21, 0.16) 0%,
            rgba(245, 158, 11, 0.1) 100%
    );

    color: #f59e0b;

    box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.7),
            0 10px 30px rgba(245, 158, 11, 0.12);
`;

const EmptyTitle = styled.div`
    margin-top: 22px;

    font-size: 24px;
    font-weight: 900;

    letter-spacing: -0.04em;

    color: #0f172a;
`;

const EmptyText = styled.div`
    max-width: 420px;

    margin-top: 12px;

    font-size: 14px;
    line-height: 1.7;

    color: #64748b;
`;

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
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
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

const RightTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const WriteButton = styled.button`
    height: 42px;

    padding: 0 18px;

    border-radius: 12px;

    border: none;

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

    transition: 0.16s ease;

    box-shadow:
            0 10px 24px rgba(34,197,94,0.18);

    &:hover:not(:disabled) {
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.45;

        cursor: not-allowed;

        box-shadow: none;
    }
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
    width: ${({width}) => width}%;

    height: 100%;

    border-radius: 999px;

    background: linear-gradient(
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

    background: linear-gradient(
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

    box-shadow: 0 10px 20px rgba(34, 197, 94, 0.18);
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
    color: ${({filled}) =>
            filled ? "#facc15" : "#cbd5e1"};

    fill: ${({filled}) =>
            filled ? "#facc15" : "transparent"};
`;