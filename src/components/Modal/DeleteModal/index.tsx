import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FiAlertOctagon } from 'react-icons/fi';
import { Container } from './styles';
import IconButton from '../../FormComponents/Button/IconButton';

interface ModalProps {
    children?: any;
    isOpen: boolean;
    setIsOpen: () => void;
    handleConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen, handleConfirm }) => {
    const [modalStatus, setModalStatus] = useState(isOpen);

    useEffect(() => {
        setModalStatus(isOpen);
    }, [isOpen]);

    return (
        <ReactModal
            shouldCloseOnOverlayClick={!false}
            onRequestClose={setIsOpen}
            isOpen={modalStatus}
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
                    width: '350px',
                    border: 'none',
                    padding: '10px',
                    height: '170px',
                    display: 'flex',
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            {/* {children} */}
            <Container>
                <FiAlertOctagon size={40} />
                <p>Deseja realmente excluir este registro ?</p>
                <div className="buttons">
                    <IconButton icon={MdDeleteForever} title="Cancelar" background="#DE3B3B" action={setIsOpen} />
                    <IconButton icon={FaCheck} title="Confirmar" background="#00A57C" action={handleConfirm} />
                </div>
            </Container>
        </ReactModal>
    );
};

export default Modal;
