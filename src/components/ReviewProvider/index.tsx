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
    removeRecommendation: (id: string) => void;
    infosToCreateNewRecommendation: any;
    providerId: string;
}

const ReviewProvider: React.FC<ReviewProps> = ({
    providerRecommendations,
    newRecommendation,
    infosToCreateNewRecommendation,
    providerId,
    setNewRecommendationToFalse,
    removeRecommendation,
}): any => {
    const [valueTextArea, setValueTextArea] = useState('');
    const [newRatingStars, setNewRatingStars] = useState(0);
    const { user, isAuthenticated } = useAuth();

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

    const clearAndClose = useCallback(() => {
        setNewRecommendationToFalse();
        setValueTextArea('');
        setNewRatingStars(0);
    }, [setNewRecommendationToFalse]);

    const handleDeleteReview = useCallback(
        async (id: string) => {
            await api.delete(`/providerRecommendation/${id}`).then(() => {
                removeRecommendation(id);
                return toast.success('Recomendação excluída com sucesso!')!;
            });
        },
        [removeRecommendation],
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
                            <div
                                style={{
                                    margin: '10px 0px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p style={{}}>{recommendation.notes}</p>

                                {isAuthenticated &&
                                    (recommendation.user.id === user.id || providerId === user.id) && (
                                        <MdDeleteForever
                                            onClick={() => handleDeleteReview(recommendation.id)}
                                            color="#DE3B3B"
                                            size={22}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )}
                            </div>
                        </div>
                    </Review>
                ))}
            </Reviews>
        </Container>
    );
};

export default ReviewProvider;
