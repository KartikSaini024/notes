import { useState, useEffect } from "react";
import './index.css';  // Ensure this is correctly imported
import closeIcon from './assets/close.png';
import createIcon from './assets/write.png';
import addIcon from './assets/add.png'

let usedID = []
function getRandomNumber() {
    let val;

    do {
        val = Math.floor(Math.random() * 1000) + 1;
    } while (usedID.includes(val));
    // get in infinite loop if all ids are used

    usedID.push(val)
    return val;
}

function AddNote(props) {
    const [noteType, setNoteType] = useState("simple");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    let [videoUrl, setVideoUrl] = useState("");
    const [timestamps, setTimestamps] = useState([]);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timestampNote, setTimestampNote] = useState("");
    const dateCreated = new Date().toISOString();
    const [isOpen, setIsOpen] = useState(false); // State to control visibility
    const [charLeft, setCharLeft] = useState(35); // Initialize with 35 characters left

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const addTimestamp = () => {
        if (timestampNote.trim() === "") return;
        const newTimestamp = {
            id: timestamps.length + 1,
            time: `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`,
            comment: timestampNote
        };
        setTimestamps([...timestamps, newTimestamp]);
        setTimestampNote(""); // Clear the input field
    };

    const removeTimestamp = (id) => {
        setTimestamps(timestamps.filter(timestamp => timestamp.id !== id));
    };

    const resetForm = () => {
        setNoteType("simple");
        setTitle("");
        setText("");
        setVideoUrl("");
        setTimestamps([]);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTimestampNote("");
    };

    const createNote = () => {
        if (noteType === "video" && videoUrl.trim() === "") {
            alert("Video URL is required for video notes");
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
        let validUrl = urlFormat.some((format) => videoUrl.startsWith(format)); // This method tests whether at least one element in the array passes the test
        if (noteType === "video" && !validUrl) {
            alert("Enter a valid YouTube video URL");
            return;
        }
        if (videoUrl.startsWith("www.youtube.com/") || videoUrl.startsWith("youtube.com/") || videoUrl.startsWith("youtu.be")) {
            videoUrl = "https://" + videoUrl;
        }
        if (title.trim() === "") {
            alert("Title cannot be empty");
            return;
        }
        let slicedTitle = title.slice(0, 35); // limits title length
        let note = {};
        let date2 = dateCreated;
        if (noteType === "simple") {
            note = { id: getRandomNumber(), type: "simple", title: slicedTitle, text: text, date: dateCreated, dateModified: date2 };
        } else {
            note = {
                id: getRandomNumber(),
                type: "video",
                title: slicedTitle,
                ytlink: videoUrl,
                text: text,
                comments: timestamps,
                date: dateCreated, 
                dateModified: date2
            };
        }
        // console.log("Note to Add: " + JSON.stringify(note));

        props.updateNoteList([...props.currentNotes, note]);
        resetForm();
        closeEditor();
    };

    const closeEditor = (reset=false) => {
        setIsOpen(false);
        if (reset){
            resetForm();
        }
    };

    const addNote = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const count = 35 - title.length;
        setCharLeft(count);

        const charLeftElement = document.querySelector('#charleft');
        if (charLeftElement) {
            if (count < 1) {
                charLeftElement.classList.add('red');
                charLeftElement.classList.remove('pale-grey');
            } else {
                charLeftElement.classList.add('pale-grey');
                charLeftElement.classList.remove('red');
            }
        }
    }, [title]);

    return (
        <>
            <button className='flex-center btn-hover' style={props.btnStyle} onClick={addNote}>Create Note<img src={createIcon} alt="icon" id='create-btn' className="button-icon" /></button>
            {isOpen && (
                <div className="add-note-overlay" onClick={()=>closeEditor(false)}>
                    <div id="create-note" className="add-note" onClick={(e) => e.stopPropagation()}>
                        <img src={closeIcon} id='close-btn' onClick={()=>closeEditor(true)} alt="close" />
                        <h2>Add Note</h2>
                        <label htmlFor="title"><span>Title:</span>
                            <input
                                type="text"
                                placeholder="Add Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={35}
                            />
                            <p id="charleft">{charLeft}/35</p>
                        </label>
                        <label htmlFor="text"><span>Note:</span>
                            <textarea
                                placeholder="Write Something..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </label>
                        <div className="radio-group">
                            <input
                                type="radio"
                                name="type"
                                value="simple"
                                id="simple"
                                checked={noteType === "simple"}
                                onChange={() => setNoteType("simple")}
                            />
                            <label htmlFor="simple">Simple Note</label>
                            <input
                                type="radio"
                                name="type"
                                value="video"
                                id="video"
                                checked={noteType === "video"}
                                onChange={() => setNoteType("video")}
                            />
                            <label htmlFor="video">Video Note</label>
                        </div>
                        {noteType === "video" && (
                            <>
                                <label htmlFor="video"><span>Video URL:</span>
                                    <input
                                        type="text"
                                        placeholder="https://www.youtube.com/watch?v=xxx"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        required
                                    />
                                </label>
                                <label htmlFor="timestamps">
                                    <span>Timestamp Comments:</span> <br />
                                    <input
                                        type="number"
                                        name="hours"
                                        min={0}
                                        max={59}
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        name="minutes"
                                        min={0}
                                        max={59}
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        name="seconds"
                                        min={0}
                                        max={59}
                                        value={seconds}
                                        onChange={(e) => setSeconds(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="timestamp-note"
                                        id="ts-note"
                                        placeholder="Timestamp Note..."
                                        value={timestampNote}
                                        onChange={(e) => setTimestampNote(e.target.value)}
                                    />
                                    <button onClick={addTimestamp}>Add Comment</button>
                                </label>
                                <div className="timestamp-preview">
                                    {timestamps.map((ts) => (
                                        <div key={ts.id}>
                                            <span>{ts.time} - {ts.comment}</span>
                                            <button onClick={() => removeTimestamp(ts.id)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <button className="button-transition doneButton" onClick={createNote}>Create Note <img src={addIcon} className="doneIcon" alt="" /></button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddNote;
