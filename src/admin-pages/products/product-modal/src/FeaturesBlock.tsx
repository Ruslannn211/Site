import {type Dispatch, type FC, type SetStateAction} from "react";
import styled from "styled-components";
import {Plus, Trash2,} from "lucide-react";

import type {
    ProductFeatureType,
} from "@types-lib";

interface Props {
    featuresState: [ProductFeatureType[], Dispatch<SetStateAction<ProductFeatureType[]>>];
}

const FeaturesBlock: FC<Props> = (props) => {
    const [features, setFeatures] = props.featuresState;

    const addFeature = () => {
        setFeatures(prev => [
            ...prev,
            {id: Date.now(), label: "", value: "",},
        ] as ProductFeatureType[]);
    };

    const updateFeature = (
        id: number, field: "label" | "value", value: string
    ) => {
        setFeatures(prev =>
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

    const removeFeature = (id: number) => {
        setFeatures(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    if (!open) {
        return null;
    }

    return (
        <Right>
            <RightTop>
                <SectionTitle>Характеристики</SectionTitle>
                <AddButton onClick={addFeature}>
                    <Plus size={14}/>
                </AddButton>
            </RightTop>

            <Features>
                {features.map(item => (
                    <FeatureRow key={item.id}>
                        <FeatureInput
                            value={item.label}
                            onChange={e =>
                                updateFeature(item.id, "label", e.target.value)
                            }
                            placeholder="Назва"
                        />

                        <FeatureInput
                            value={item.value}
                            onChange={e =>
                                updateFeature(item.id, "value", e.target.value)
                            }
                            placeholder="Значення"
                        />

                        <RemoveFeatureButton onClick={() => removeFeature(item.id)}>
                            <Trash2 size={13}/>
                        </RemoveFeatureButton>
                    </FeatureRow>
                ))}
            </Features>
        </Right>
    );
};

export default FeaturesBlock;

const Right = styled.div`
    overflow-y: auto;

    padding: 18px;

    border-left: 1px solid #edf2f7;

    box-sizing: border-box;
`;

const SectionTitle = styled.div`
    font-size: 17px;
    font-weight: 800;

    color: #0f172a;
`;

const Input = styled.input`
    width: 100%;

    height: 48px;

    padding: 0 15px;

    border-radius: 15px;

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

const FeatureInput = styled(Input)`
    height: 42px;

    border-radius: 12px;

    font-size: 13px;
`;

const RightTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Features = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: 18px;
`;

const FeatureRow = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr auto;

    gap: 8px;
`;

const AddButton = styled.button`
    width: 34px;
    height: 34px;

    border-radius: 12px;

    border: none;

    background: #22c55e;

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const RemoveFeatureButton = styled.button`
    width: 42px;
    height: 42px;

    border-radius: 12px;

    border: 1px solid #fee2e2;

    background: #fff5f5;

    color: #ef4444;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;