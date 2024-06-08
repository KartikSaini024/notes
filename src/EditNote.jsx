import NoteEditor from './NoteEditor.jsx';
import editIcon from './assets/edit.png';
import React, { useState } from 'react';

function EditNote(props) {
    // Recieved note properties as props. eg- props.text

    // Flow:
    // Notes objectArray in NotesContainer.jsx -> sends to each Note.jsx -> send to EditNote.jsx -> update sent back to Note.jsx -> updates the notes objectsArray back in NotesContainer.jsx

    // Recieved props from spreaded ...Note in Note.jsx while mounting
    const Note = {
        id: props.id,
        type: props.type,
        title: props.title,
        text: props.text,
        name: props.name,
        ytlink: props.ytlink,
        comments: props.comments,
        date: props.date,
        dateModified: props.dateModified
    };

    const [note_title, setNote_title] = useState(props.title);
    const [note_content, setNote_content] = useState(props.text);
    const [editorVisible, setEditorVisible] = useState(false);

    const editItem = (e) => {
        e.stopPropagation();
        setEditorVisible(true);
    };

    const toggleEditor = (e, close = false) => {
        e.stopPropagation();
        setEditorVisible(!editorVisible);
    };

    return (
        <>
            <img onClick={editItem} src={editIcon} alt="edit" id='edit-btn' />
            {editorVisible && (
                <NoteEditor {...Note} closeFunction={toggleEditor} saveEdit={props.saveEdit} />
            )}
        </>
    );
}

export default EditNote;
