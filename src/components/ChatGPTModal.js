import React, {useState} from 'react';
import Modal from 'react-modal';
import {Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        minWidth: '50vw',
        maxWidth: '70vw',
        maxHeight: '70vh',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignText: 'center'
    }
};

const ChatGPT = (props) => {
    const [buttonText, setButtonText] = useState('Generate');    
    Modal.setAppElement('#root');

    const onButtonClickHandler = () => {
        props.getChatGPTMessage(); 
        setButtonText('Regenerate');
    }

    const speechPlay = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(props.message);
        synth.speak(utterance);
    };

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="ChatGPT Modal">
            <IconButton onClick={props.closeModal} style={{float: 'right'}}>
                <CloseIcon/>
            </IconButton>
            <div>
                <p style={{color: 'black', display: 'inline'}}>{props.message}</p>
                <IconButton onClick={speechPlay} style={{display: 'inline'}}><VolumeUpIcon/></IconButton>
            </div>
            <Button onClick={onButtonClickHandler}>{buttonText}</Button>
        </Modal>
    )
}
export default ChatGPT;