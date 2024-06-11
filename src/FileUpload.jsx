import React, { useState } from 'react';
import importIcon from './assets/import.png';

function FileUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);



    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);

        let btn = document.querySelector('#import-button');
        btn.style.display = 'block';
        btn.classList.add("border-anim");        
        };
        
        const handleButtonClick = () => {
            let btn = document.querySelector('#import-button');
            btn.classList.remove("border-anim");    
            btn.style.display = 'none';

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

            <button>Import <img src={importIcon} className='button-icon' alt="" /><input className='file-button' type="file" onChange={handleFileChange} /></button>
            <button id='import-button' onClick={handleButtonClick} style={{ display: "none" }}>Submit</button>
        </div>
    );
}

export default FileUpload;
