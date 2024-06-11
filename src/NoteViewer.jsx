import doneIcon from './assets/done.png';


function NoteViewer(props) {


    let ts = [
        { id: 1, time: "00:00:55", comment: "Here's the drop" },
        { id: 2, time: "00:01:55", comment: "Second drop adsjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj" }
    ];
    let Note = {
        id: props.id,
        type: props.type,
        title: props.title,
        text: props.text,
        ytlink: props.ytlink,
        comments: props.comments,
        date: props.date,
        dateModified: props.dateModified
    }
    let m = { id: 2, type: "simple", title: "Kartik", text: "Hello, this is a test", date: new Date().toISOString(), dateModified: new Date().toISOString() };

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24-hour format
    };

    const d = new Date(Note.date);
    const date = d.toLocaleString('locale', options);
    const dM = new Date(Note.dateModified);
    const dateModified = dM.toLocaleString('locale', options);

    function renderComments() {
        return Note.comments.map((element, index) => {
            return <li key={index}><a href={redirectLink(element.time)} target="_blank">{element.time}</a> - {element.comment}</li>;
        });

        function redirectLink(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            let ts = (hours * 3600) + (minutes * 60) + seconds;
            let link = Note.ytlink.replace("embed/","watch?v=") + `&t=${ts}`;
            return link;
        }
    }

    function videoNote() {
        if (Note.type === "video") {
            return (
                <div className="video-container">

                    <iframe className='viewer-yt' src={Note.ytlink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="viewer-ts">
                        <ul>
                            {renderComments()}
                        </ul>
                    </div>
                </div>
            );
        }
    }


    function handleClose() {
        props.toggleNoteViewer();
    }

    function handleDone(e) {
        // e.stopPropagation();
        console.log("Done pressed")
        // props.toggleNoteViewer
        handleClose()
    }

    return (
        <>
            <div className='viewer-popup-overlay' onClick={handleClose}>

                <div className="note-viewer" onClick={(e) => e.stopPropagation()}>
                    <h1>{Note.title}</h1>
                    {videoNote()}
                    <div className="viewer-text">
                        <p>{Note.text}</p>
                    </div>
                    <span>
                        Created: {date} <br />
                        Modified: {dateModified}
                    </span>
                    {/* <button className='viewer-close-button'>Done <img src={doneIcon} className='doneIcon' alt="" onClick={(e) => handleDone(e)} /></button> */}
                </div>
            </div>
        </>
    );
}
export default NoteViewer;
