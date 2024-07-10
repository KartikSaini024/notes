import React,{useState} from 'react';
import PropTypes from 'prop-types'
import DeleteNote from './DeleteNote.jsx';
import EditNote from './EditNote.jsx';
import NoteViewer from './NoteViewer.jsx';


function VidNote(props) {

    // console.log(props.log);
    
    // fix yt link
    let ytLink = props.ytlink;
    ytLink = ytLink.replace("watch?v=", "embed/");
    ytLink = ytLink.replace("youtu.be/", "youtube.com/embed/");
    let q = ytLink.indexOf('?');
    let amp = ytLink.indexOf('&');
    
    if (q !== -1) {
        ytLink = ytLink.substring(0, q);
    }
    if (amp !== -1) {
        ytLink = ytLink.substring(0, amp);
    }
    // console.log("YTLINK: " + ytLink);
    
    let Note = {
        // these are also the recieved props from spreaded ...noteElement
        id: props.id,
        type: props.type,
        title: props.title,
        text: props.text,
        ytlink: ytLink,
        comments: props.comments,
        date: props.date,
        dateModified: props.dateModified
    }


    // let timestamps = props.stamps.timestamps;
    // let comments = props.stamps.comments;
    let [comments, setComments] = useState(Note.comments);

    let commentList = comments.map(c =>
        <p key={c.id}><a href="#">{c.time}</a>{" - " + c.comment}</p>
    );

    let [noteTitle, setNoteTitle] = useState(props.title);
    let [noteText, setNoteText] = useState(props.text);

    function onSave(updatedNote) {
        
        //this function only update title and text as of yet in both card display and object array. need to setup to recieve any changed value

        let newNote;
        
        if (props.noteObject.id === updatedNote.id){
            newNote = {...props.noteObject, ...updatedNote}
        } else{
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


    return (
        <>
            <div className="note note-cat videoNote">
            {view && <NoteViewer {...Note} toggleNoteViewer={toggleNoteViewer} />}
                <div className='note-card-div' onClick={toggleNoteViewer}>
                    <span className='note-type'><div className='note-card-div'>#{props.type} note</div></span>
                    <DeleteNote noteID={props.id} updateNotes={props.updateNoteList} />

                    <EditNote {...Note} saveEdit={onSave} />

                    <iframe id="ytplayer" width="100%" height="150" src={ytLink} title="YouTube video player" frameborder="0" allowFullScreen></iframe>

                    <h2 className='note-title'>{noteTitle}</h2>

                    <span className='note-p-div toggle-preview'>
{/*                         <p>Note ID:{Note.id}</p> */}
                        <p>{noteText}</p>

                        {/* if timestamps are available,print */}
                        {comments.length > 0 ? commentList : null}

                    </span>

                </div>
            </div>
        </>
    )
};

// VidNote.defaultProps = {
//     name: "Guest",
//     title: "Video Note",
//     text: "Anonymous Video note created by Guest",
//     ytlink: "https://www.youtube.com/watch?v=9XrCyRCiryU",
//     comments: [{id:-1, time:"00:00", comment: ""} ]
// }

VidNote.PropTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    ytlink: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        time: PropTypes.string,
        comment: PropTypes.string
    })),
}

export default VidNote;
