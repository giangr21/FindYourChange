/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useState } from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import { Container } from './styles';
import api from '../../services/api';
import ModalToShowImage from './ModalToShowImage';

interface Image {
    id: string;
    defaultImage: boolean;
    image: string;
    imageBase64: any;
}

interface GalleryProps {
    providerImages: Image[];
}

const GalleryProvider: React.FC<GalleryProps> = ({ providerImages }): any => {
    const [imageUrlToPreview, setImageUrlToPreview] = useState<any>('');
    const [modalPreviewImgOpen, setModalPreviewImgOpen] = useState(false);

    const handleOnClick = useCallback(async (imageName: string) => {
        await api.get(`storage/base64/${imageName}`).then((response) => {
            setImageUrlToPreview(response.data);
            setModalPreviewImgOpen(true);
        });
    }, []);

    const toggleModal = useCallback((): void => {
        setModalPreviewImgOpen((prevState) => !prevState);
    }, []);

    return (
        <>
            <Container>
                <Row>
                    {providerImages.map((img) => (
                        <Col key={img.id} xs={12} sm={6} md={4} lg={4}>
                            <img
                                style={{
                                    marginLeft: '10px',
                                    width: '98%',
                                    height: '150px',
                                    borderRadius: '2%',
                                    cursor: 'pointer',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                src={`data:image/png;base64,${img.imageBase64}`}
                                onClick={() => handleOnClick(img.image)}
                                alt=""
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            {modalPreviewImgOpen && (
                <ModalToShowImage
                    isOpen={modalPreviewImgOpen}
                    setIsOpen={toggleModal}
                    imageUrl={imageUrlToPreview}
                />
            )}
        </>
    );
};

export default GalleryProvider;
