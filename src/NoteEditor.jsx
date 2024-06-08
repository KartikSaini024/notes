import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import closeIcon from './assets/close.png';
import doneIcon from './assets/done.png';

function NoteEditor(props) {
    const { title: initialTitle, text: initialText, type: initialType, ytlink: initialYtlink, comments: initialComments } = props;
    const [title, setTitle] = useState(initialTitle);
    const [text, setText] = useState(initialText);
    const [type, setType] = useState(initialType);
    let [videoUrl, setVideoUrl] = useState(initialYtlink || "");
    const [timestamps, setTimestamps] = useState(initialComments || []);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timestampNote, setTimestampNote] = useState("");
    const [editorHeader, setEditorHeader] = useState("Note Editor");

    // console.log("initail comments: " + JSON.stringify(initialComments))

    useEffect(() => {
        setTitle(props.title);
        setText(props.text);
        setType(props.type);
        setVideoUrl(props.ytlink || "");
        setTimestamps(props.comments || []);
    }, [props.title, props.text, props.type, props.ytlink, props.comments]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTextChange = (e) => setText(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);
    const handleVideoUrlChange = (e) => setVideoUrl(e.target.value);
    const handleTimestampNoteChange = (e) => setTimestampNote(e.target.value);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    const addTimestamp = () => {
        if (timestampNote.trim() === "") return;
        const newTimestamp = {
            id: timestamps.length + 1,
            time: `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`,
            comment: timestampNote
        };
        setTimestamps([...timestamps, newTimestamp]);
        setTimestampNote(""); // Clear the input className='edit-input' field
    };

    const removeTimestamp = (id) => setTimestamps(timestamps.filter(timestamp => timestamp.id !== id));

    const resetForm = () => {
        setTitle(initialTitle);
        setText(initialText);
        setType(initialType);
        setVideoUrl(initialYtlink || "");
        setTimestamps(initialComments || []);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTimestampNote("");
    };

    const handleDone = (e) => closeEditor(e, true);

    const closeEditor = (e, saved) => {
        if (!saved) {
            resetForm();
            console.log("Edits were not saved: isSaved - " + saved);
        } else {
            if (type === "video" && videoUrl.trim() === "") {
                alert("YouTube URL cannot be Empty");
                return;
            }
            let urlFormat = [
                "https://www.youtube.com/",
                "https://youtube.com/",
                "https://youtu.be/",
                "http://www.youtube.com/",
                "http://youtube.com/",
                "http://youtu.be/",
                "www.youtube.com/",
                "youtube.com/",
                "youtu.be/",
            ]
            let validUrl = urlFormat.some((format) => videoUrl.startsWith(format)) && !videoUrl.includes("embed"); // This method tests whether at least one element in the array passes the test
            if (type === "video" && !validUrl) {
                alert("Enter a valid YouTube video URL");
                return;
            }
            if (videoUrl.startsWith("www.youtube.com/") | videoUrl.startsWith("youtube.com/") | videoUrl.startsWith("youtu.be")) {
                videoUrl = "https://" + videoUrl;
            }
            let slicedTitle = title.slice(0, 35); //limits title length
            let updatedNote = {
                id: props.id,
                title: slicedTitle,
                text,
                type,
                ytlink: "",
                comments: [],
                date: props.date,
                dateModified: new Date().toISOString()
            };
            if (updatedNote.type === "video") {
                updatedNote = {
                    ...updatedNote,
                    ytlink: videoUrl,
                    comments: timestamps,
                }
            }
            
            console.log("title after slice: " + updatedNote.title)
            console.log("Updated note:", updatedNote); // Verify the updated note
            props.saveEdit(updatedNote);
        }

        props.closeFunction(e, true);
    };

    let [charLeft, setCharLeft] = useState();
    useEffect(() => {
        let count = 35 - title.length;
        setCharLeft(count)
        if (count < 1) {
            document.querySelector('#charleft2').classList.add('red');
            document.querySelector('#charleft2').classList.remove('pale-grey');
        }
        else {
            document.querySelector('#charleft2').classList.add('pale-grey');
            document.querySelector('#charleft2').classList.remove('red');
        }
    }, [title])


    return (
        <div id='note-editor' className='popup-overlay' onClick={(e) => closeEditor(e, false)}>
            <div className='popup-window note-card-div' onClick={(e) => e.stopPropagation()}>
                <img src={closeIcon} id='close-btn' onClick={(e) => closeEditor(e, false)} alt="close" />
                <h2 id='editor-title'>{editorHeader}</h2>

                <div id='content-editor' className='flex-center note-editor'>
                    <input className='edit-input'
                        type="text"
                        name="title"
                        id="edit-title"
                        value={title}
                        placeholder='Title...'
                        onChange={handleTitleChange}
                    />
                    <p id='charleft2'>{charLeft}/35</p>
                    <textarea
                        name="note"
                        id="edit-note"
                        value={text}
                        placeholder='Write something...'
                        onChange={handleTextChange}
                    ></textarea>
                    <div className="radio-group">
                        <input className='edit-input'
                            type="radio"
                            name="type"
                            value="simple"
                            id="simple"
                            checked={type === "simple"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="simple">Simple Note</label>
                        <input className='edit-input'
                            type="radio"
                            name="type"
                            value="video"
                            id="video"
                            checked={type === "video"}
                            onChange={handleTypeChange}
                        />
                        <label htmlFor="video">Video Note</label>
                    </div>
                    {type === "video" && (
                        <>
                            <label htmlFor="video"><span>Video URL:</span>
                                <input className='edit-input'
                                    type="text"
                                    placeholder="Add Video URL..."
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    required
                                />
                            </label>
                            <label htmlFor="timestamps">
                                <span>Timestamp Comments:</span> <br />
                                <input className='edit-input'
                                    type="number"
                                    name="hours"
                                    min={0}
                                    max={59}
                                    value={formatNumber(hours)}
                                    onChange={(e) => setHours(e.target.value)}
                                />
                                <input className='edit-input'
                                    type="number"
                                    name="minutes"
                                    min={0}
                                    max={59}
                                    value={formatNumber(minutes)}
                                    onChange={(e) => setMinutes(e.target.value)}
                                />
                                <input className='edit-input'
                                    type="number"
                                    name="seconds"
                                    min={0}
                                    max={59}
                                    value={formatNumber(seconds)}
                                    onChange={(e) => setSeconds(e.target.value)}
                                />
                                <input className='edit-input'
                                    type="text"
                                    name="timestamp-note"
                                    id="ts-note"
                                    placeholder="Timestamp Note..."
                                    value={timestampNote}
                                    onChange={(e) => setTimestampNote(e.target.value)}
                                />
                                <div className="timestamp-preview">
                                    {timestamps.map((ts) => (
                                        <div key={ts.id}>
                                            <span>{ts.time} - {ts.comment}</span>
                                            <button onClick={() => removeTimestamp(ts.id)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={addTimestamp}>Add Comment</button>
                            </label>
                        </>
                    )}
                </div>
                <button className='flex-center doneButton' onClick={(e) => handleDone(e)}>
                    Done <img src={doneIcon} alt="icon" className='doneIcon' />
                </button>

            </div>
        </div>
    );
}

NoteEditor.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ytlink: PropTypes.string,
    comments: PropTypes.array,
    closeFunction: PropTypes.func.isRequired,
    saveEdit: PropTypes.func.isRequired
};

export default NoteEditor;
