/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { Container, Header } from './styles';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen: () => void;
    imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, imageUrl }) => {
    return (
        <ReactModal
            shouldCloseOnOverlayClick={!false}
            onRequestClose={setIsOpen}
            isOpen={isOpen}
            ariaHideApp={false}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    color: 'black',
                    borderRadius: '8px',
                    width: 'auto',
                    border: 'none',
                    padding: '10px',
                    height: '75%',
                    display: 'flex',
                    zIndex: 5,
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            <Container>
                <Header>
                    <span>Preview Image</span>
                    <FaWindowClose size={20} onClick={setIsOpen} />
                </Header>
                <img
                    style={{
                        width: 'auto',
                        height: '100%',
                        borderRadius: '2%',
                    }}
                    src={`data:image/png;base64,${imageUrl}`}
                    alt=""
                />
            </Container>
        </ReactModal>
    );
};

export default Modal;
