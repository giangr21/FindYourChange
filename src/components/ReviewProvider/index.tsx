import React, { useCallback, useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Textarea } from 'baseui/textarea';
import { MdCheck, MdClose, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Container, HeaderReview, NewRecommendation, Reviews, Review } from './styles';
import IconButton from '../FormComponents/Button/IconButton';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

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
    const [valueTextArea, setValueTextArea] = useState('');
    const [newRatingStars, setNewRatingStars] = useState(0);
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const [reviews, setReviews] = useState<any>([]);
    const [provider, setProvider] = useState<any>({});

    const handleNewReview = useCallback(async () => {
        if (valueTextArea.trim() === '' || !valueTextArea) {
            return toast.error('Favor inserir uma mensagem. Tente novamente');
        }
        try {
            await api
                .post('/providerRecommendation', {
                    rating: Number(newRatingStars),
                    notes: valueTextArea,
                    user: infosToCreateNewRecommendation.userId,
                    provider: infosToCreateNewRecommendation.providerId,
                })
                .then(async (response) => {
                    const { data: imgBase64 } = await api.get(
                        `storage/base64/min/${infosToCreateNewRecommendation.userId}`,
                    );

                    toast.success('Recomendação criada com sucesso!');

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

    const getProvider = useCallback(async () => {
        const splitedPathName = location.pathname.split('/');
        const idProvider = splitedPathName[splitedPathName.length - 1];
        await api
            .get(`/provider/specificProvider/${idProvider}`)
            .then(async (response) => {
                setProvider(response.data);
            })
            .catch((e) => {
                toast.error('Houve um erro ao buscar dados!');
                console.log(e);
            });
    }, [location.pathname]);

    const getReviewsFromUser = useCallback(async () => {
        await api.get(`providerRecommendation/user/${user.id}`).then(async (response) => {
            setReviews(response.data);
        });
    }, [user.id]);

    const clearAndClose = useCallback(() => {
        setNewRecommendationToFalse();
        setValueTextArea('');
        setNewRatingStars(0);
    }, []);

    useEffect(() => {
        getProvider();
        getReviewsFromUser();
    }, []);

    const handleDeleteReview = useCallback(
        async (id: string) => {
            await api.delete(`/providerRecommendation/${id}`).then(() => {
                setReviews(reviews.filter((review: any) => review.id !== id));
                return toast.success('Recomendação excluida com sucesso!')!;
            });
        },
        [reviews],
    );

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
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <IconButton
                            style={{
                                margin: '10px 5px',
                            }}
                            icon={MdCheck}
                            title="Confirmar"
                            background="#ff9000"
                            action={handleNewReview}
                        />
                        <IconButton
                            style={{
                                margin: '10px 0px',
                            }}
                            icon={MdClose}
                            title="Cancelar"
                            background="#c53030"
                            action={clearAndClose}
                        />
                    </div>
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
                        {isAuthenticated && (recommendation.user.id === user.id || provider.id === user.id) && (
                            <button onClick={() => handleDeleteReview(recommendation.id)} type="button">
                                <MdDeleteForever color="#DE3B3B" size={20} />
                            </button>
                        )}
                    </Review>
                ))}
            </Reviews>
        </Container>
    );
};

export default ReviewProvider;
