import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeleteNote from './DeleteNote.jsx';
import EditNote from './EditNote.jsx';
import NoteViewer from './NoteViewer.jsx';


function Note(props) {
    // props is the {} note object itself

    // content to the db should be sent from this component when save button is hit

    let Note = {
        // these are also the recieved props from spreaded ...noteElement
        id: props.id,
        type: props.type,
        title: props.title,
        text: props.text,
        ytlink: props.ytlink,
        comments: props.comments,
        date: props.date,
        dateModified: props.dateModified
    }
    // props.updateNoteList //function to update note object array

    // console.log(props.log);



    let [noteTitle, setNoteTitle] = useState(props.title);
    let [noteText, setNoteText] = useState(props.text);

    function onSave(updatedNote) {

        //this function only update title and text as of yet in both card display and object array. need to setup to recieve any changed value

        let newNote;

        if (props.noteObject.id === updatedNote.id) {
            newNote = { ...props.noteObject, ...updatedNote }
        } else {
            newNote = props.noteObject;
        }
        // sets note card display values
        setNoteTitle(newNote.title);
        setNoteText(newNote.text);

        // update note object array
        props.updateNoteList(newNote)
        console.log(`Note Card display changed to: ${newNote.title} - ${newNote.text}`)

    }

    let [view, setView] = useState(false);
    function toggleNoteViewer() {
        setView(!view)
    }

    const icon = `https://robohash.org/${props.title}`
    return (
        <>
            <div className="note note-cat simpleNote">

                {view && <NoteViewer {...Note} toggleNoteViewer={toggleNoteViewer} />}
                <div className='note-card-div' onClick={toggleNoteViewer}>
                    <span className='note-type'><div className='note-card-div'>#{props.type} note</div></span>

                    <DeleteNote noteID={props.id} updateNotes={props.updateNoteList} />
                    <EditNote {...Note} saveEdit={onSave} />

                    <img className='avatar' src={icon} alt="" />
                    <h2 className='note-title'>{noteTitle}</h2>
                    <span className='note-p-div toggle-preview'>
{/*                         <p>Note ID: {props.id}</p> */}
                        <p id='note-content'>{noteText}</p>
                    </span>
                </div>
            </div>
        </>
    )
};

// Note.defaultProps = {
//     id:-1,
//     name: "anon",
//     title: "anon note",
//     text: "no props provided"
// }

Note.PropTypes = {
    title: PropTypes.string,
    text: PropTypes.string
}

export default Note;
