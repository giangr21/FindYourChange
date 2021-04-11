import React, { useCallback } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Textarea } from 'baseui/textarea';
import { MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Container, HeaderReview, NewRecommendation, Reviews, Review } from './styles';
import IconButton from '../Button/IconButton';
import api from '../../services/api';

interface Review {
    id: string;
    notes: string;
    rating: number;
    createdAt?: string;
    user: {
        id: string;
        name: string;
        lastName: string;
        avatar: string;
    };
}

interface ReviewProps {
    providerRecommendations: Review[];
    newRecommendation: boolean;
    setNewRecommendationToFalse: () => void;
    infosToCreateNewRecommendation: any;
}

const ReviewProvider: React.FC<ReviewProps> = ({
    providerRecommendations,
    newRecommendation,
    infosToCreateNewRecommendation,
    setNewRecommendationToFalse,
}): any => {
    const [valueTextArea, setValueTextArea] = React.useState('');
    const [newRatingStars, setNewRatingStars] = React.useState(0);

    const handleNewReview = useCallback(async () => {
        try {
            await api
                .post('/providerRecommendation', {
                    rating: Number(newRatingStars),
                    notes: valueTextArea,
                    user: infosToCreateNewRecommendation.userId,
                    provider: infosToCreateNewRecommendation.providerId,
                })
                .then(async (response) => {
                    console.log(response);

                    const { data: imgBase64 } = await api.get(
                        `storage/base64/min/${infosToCreateNewRecommendation.userId}`,
                    );

                    toast.success('Nova recomendação criada com sucesso!');

                    providerRecommendations.push({
                        id: response.data,
                        rating: newRatingStars,
                        notes: valueTextArea,
                        createdAt: moment(Date.now()).format('DD/MM/YYYY - HH:mm'),
                        user: {
                            id: infosToCreateNewRecommendation.userId,
                            name: infosToCreateNewRecommendation.userName,
                            lastName: infosToCreateNewRecommendation.userLastName,
                            avatar: imgBase64,
                        },
                    });

                    setNewRecommendationToFalse();
                    setValueTextArea('');
                    setNewRatingStars(0);
                });
        } catch (e) {
            console.log(e);
            toast.error('Nao foi possivel criar a recomendação! Tente novamente');
        }
    }, [
        infosToCreateNewRecommendation,
        newRatingStars,
        providerRecommendations,
        setNewRecommendationToFalse,
        valueTextArea,
    ]);

    return (
        <Container>
            <HeaderReview />
            {newRecommendation && (
                <NewRecommendation>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '10px 0px',
                        }}
                    >
                        <span
                            style={{
                                marginRight: '7px',
                            }}
                        >
                            Selecione a quantidade de estrelas para a recomendação:
                        </span>
                        <ReactStars
                            value={newRatingStars}
                            count={5}
                            size={30}
                            edit
                            activeColor="#ffd700"
                            onChange={(e: any) => setNewRatingStars(e)}
                        />
                    </div>
                    <Textarea
                        value={valueTextArea}
                        onChange={(e: any) => setValueTextArea(e.target.value)}
                        placeholder="Digite aqui a sua recomendação."
                        clearable
                        autoFocus
                    />
                    <IconButton
                        style={{
                            margin: '10px 0px',
                        }}
                        icon={MdCheck}
                        title="Confirmar"
                        background="#ff9000"
                        action={handleNewReview}
                    />
                </NewRecommendation>
            )}
            <Reviews>
                {providerRecommendations.map((recommendation) => (
                    <Review key={recommendation.id}>
                        <img
                            src={`data:image/png;base64,${recommendation.user.avatar}`}
                            alt={recommendation.user.name}
                        />
                        <div
                            style={{
                                flexDirection: 'column',
                                marginLeft: '10px',
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '5px',
                                }}
                            >
                                <span>
                                    {recommendation.user.name} {recommendation.user.lastName}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ReactStars
                                    value={recommendation.rating}
                                    count={5}
                                    size={25}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                                <span
                                    style={{
                                        marginLeft: '7px',
                                        fontSize: '15px',
                                    }}
                                >
                                    {recommendation.createdAt}
                                </span>
                            </div>
                            <p
                                style={{
                                    margin: '10px 0px',
                                }}
                            >
                                {recommendation.notes}
                            </p>
                        </div>
                    </Review>
                ))}
            </Reviews>
        </Container>
    );
};

export default ReviewProvider;
