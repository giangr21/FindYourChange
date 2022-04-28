import React from 'react';
import Switch from 'react-switch';
import { MdClose, MdCheck } from 'react-icons/md';

interface SwitchProps {
    onChange: () => void;
    isChecked: boolean;
}

const switchStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: 19,
};

const SwitchInput: React.FC<SwitchProps> = ({ isChecked, onChange }) => (
    <Switch
        onChange={onChange}
        checked={isChecked}
        uncheckedIcon={
            <div style={switchStyles}>
                <MdClose />
            </div>
        }
        checkedIcon={
            <div style={switchStyles}>
                <MdCheck />
            </div>
        }
        height={23}
        width={55}
        onColor="#2e656a"
        offColor="#c53030"
    />
);

export default SwitchInput;
