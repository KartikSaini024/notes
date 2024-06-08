import React, { useState } from 'react';
import importIcon from './assets/import.png';

function FileUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleButtonClick = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = handleFileRead;
            reader.readAsText(selectedFile);
        }
    };

    const handleFileRead = (event) => {
        const content = event.target.result;
        const password = prompt("Please enter the password to decrypt the file:");
        props.import(password, content);
    };

    return (
        <div className='fileUpload'>
            <strong>Have a file? Import your notes below</strong>
            <input className='file-button' type="file" onChange={handleFileChange} />
            <button onClick={handleButtonClick}>Import <img src={importIcon} className='button-icon' alt="" /></button>
        </div>
    );
}

export default FileUpload;
