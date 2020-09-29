import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface ModalProps {
    children: any;
    isOpen: boolean;
    width?: string;
    height?: string;
    setIsOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen, width = '950px', height = '550px' }) => {
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
                    width,
                    border: 'none',
                    padding: '10px',
                    height: '100vh',
                    maxHeight: height,
                    display: 'flex',
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            {children}
        </ReactModal>
    );
};

export default Modal;
