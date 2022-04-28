import React, { ChangeEvent } from 'react';
import { FiCamera } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';

interface FileProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    statusImgLogo: boolean;
}

const FileInput: React.FC<FileProps> = ({ statusImgLogo, onChange }) => (
    <>
        {statusImgLogo === null && (
            <label htmlFor="avatar">
                <FiCamera />
                <input accept=".jpg, .jpeg, .png" onChange={onChange} type="file" id="avatar" />
            </label>
        )}
        {statusImgLogo === true && <span>Carregando...</span>}
        {statusImgLogo === false && <BsCheckAll className="check" size={25} color="#2e656a" />}
    </>
);

export default FileInput;
