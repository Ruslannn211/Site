import {type Dispatch, type FC, type SetStateAction, useMemo} from "react";
import styled from "styled-components";
import {
    ImagePlus,
    Trash2,
} from "lucide-react";

interface Props {
    imagesState: [File[], Dispatch<SetStateAction<File[]>>];
}

const ImagesBlock: FC<Props> = (props) => {
    const {imagesState} = props;
    const [images, setImages] = imagesState;

    const previewImages = useMemo(() => {
        return images.map(image =>
            URL.createObjectURL(image)
        );
    }, [images]);

    return (
        <Section>
            <SectionTitle>
                Фотографії
            </SectionTitle>

            <ImagesGrid>
                {previewImages.map((image, index) => (
                    <ImageCard key={index}>
                        <PreviewImage src={image}/>

                        <RemoveImageButton
                            onClick={() => {
                                setImages(prev =>
                                    prev.filter(
                                        (_, i) =>
                                            i !== index
                                    )
                                );
                            }}
                        >
                            <Trash2 size={13}/>
                        </RemoveImageButton>
                    </ImageCard>
                ))}

                <UploadCard>
                    <ImagePlus size={22}/>

                    <HiddenInput
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={e => {
                            const files = Array.from(
                                e.target.files || []
                            );

                            setImages(prev => [
                                ...prev,
                                ...files,
                            ]);
                        }}
                    />
                </UploadCard>
            </ImagesGrid>
        </Section>
    );
};

export default ImagesBlock;

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.div`
    font-size: 17px;
    font-weight: 800;

    color: #0f172a;
`;

const ImagesGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    margin-top: 18px;
`;

const ImageCard = styled.div`
    position: relative;

    width: 116px;
    height: 116px;

    border-radius: 20px;

    overflow: hidden;

    border: 1px solid #e2e8f0;

    background: #f8fafc;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
`;

const UploadCard = styled.label`
    width: 116px;
    height: 116px;

    border-radius: 20px;

    border: 2px dashed #dbe4ee;

    background: #f8fafc;

    color: #64748b;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: .16s ease;

    &:hover {
        border-color: #22c55e;
        color: #22c55e;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const RemoveImageButton = styled.button`
    position: absolute;

    top: 8px;
    right: 8px;

    width: 28px;
    height: 28px;

    border-radius: 10px;

    border: none;

    background: rgba(15, 23, 42, .74);

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;