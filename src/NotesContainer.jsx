import React, { useEffect, useState } from 'react';
import Note from './Note.jsx';
import Search from './Search.jsx';
import VidNote from './VidNote.jsx';
import Buttons from './Buttons.jsx';
import filterIcon from './assets/filter.png';
import CryptoJS from 'crypto-js';
import FileUpload from './FileUpload.jsx';

// contains notes object array, renders notes for each object
// Add note and edit note updates object array, notes are re-rendered upon changes in object array

// 


function NotesContainer() {


    let [isEmpty, setIsEmpty] = useState();

    const noteContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px"
    }

    const h1style = {
        textAlign: "center",
        textShadow: "2px 2px 5px black"
    }


    let [noteList, setNoteList] = useState([]);

    let mainNoteList;
    function saveNotes() {
        mainNoteList = noteList;
    }


    let tags = [
        {},
    ]

    function updateNote({ id = -1, type = "simple", title = "", text = "", ytlink = "", comments = [], deleteNote = false, date = new Date().toISOString(), dateModified = new Date().toISOString() }) {

        let changedNote = null;

        const updatedNotes = noteList.map(note => {
            if (note.id === id && deleteNote) { // Check if the note should be deleted
                console.log(`Note (id: ${note.id}) Deleted`);
                return null; // Return null to indicate deletion
            }
            if (note.id === id) {
                changedNote = { ...note, type, title, text, ytlink, comments, date, dateModified: dateModified };
                // shorthand, same as type:type, text:text etc.
                return changedNote;
            }
            return note;
        }).filter(Boolean); // Remove null values from the updatedNotes array

        setNoteList(updatedNotes);

        if (changedNote) {
            console.log("Note edit saved in object array:", changedNote);
        } else {
            console.log("Note with id", id, "not found.");
        }

    }

    useEffect(() => {
        if (noteList.length < 1) {
            setIsEmpty(true);
            console.log("No Notes exist, isEmpty :" + isEmpty)
        }
        else {
            setIsEmpty(false);
        }
    }, [noteList]);


    function renderNotes() {

        // Default note template
        const defaultNote = {
            id: -1,
            type: "simple",
            title: "Default Title",
            text: "Default text: No note provided",
            name: "Anonymous",
            ytlink: "",
            comments: []
        };

        return noteList.map((note) => {
            // Merge defaultNote with the provided note, allowing customization
            const noteElement = { ...defaultNote, ...note };

            if (noteElement.type === "video") {
                return (
                    <VidNote key={noteElement.id} noteObject={noteElement} {...noteElement} updateNoteList={updateNote} log={"Rendered VidNote, id:" + noteElement.id} />
                );
            }

            return (
                // sending all key-pairs of noteElement by spreading ...noteElement
                // ...noteElement is same as id={id}, title={title} and so on
                <Note key={noteElement.id} noteObject={noteElement} {...noteElement} updateNoteList={updateNote} log={"Rendered Note, id:" + noteElement.id} />
            );
        });
    }

    // Filtering heading
    let [appliedFilter, setAppliedFilter] = useState();
    function filteredNotes() {
        switch (appliedFilter) {
            case "video":
                return (<h2 className='filterHeading'><img src={filterIcon} alt="icon" id='filter-btn' className='button-icon' /> Video Notes</h2>);
            case "simple":
                return (<h2 className='filterHeading'><img src={filterIcon} alt="icon" id='filter-btn' className='button-icon' /> Simple Notes</h2>);
            default:
        }
        return null;
    }


    let [encryptedNotes, setEncryptedNotes] = useState();
    function downloadNotes() {
        console.log("Starting download");

        // Prompt the user for a password
        const password = prompt("Please enter a password to encrypt the file:");

        if (password) {
            const filename = 'Notes.ks';
            const content = JSON.stringify(noteList);

            // Encrypt the content using the password
            const encryptedContent = CryptoJS.AES.encrypt(content, password).toString();

            setEncryptedNotes(encryptedContent);

            // Create a Blob from the encrypted string
            const blob = new Blob([encryptedContent], { type: 'text/plain' });

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;

            // Append the link to the document body (required for Firefox)
            document.body.appendChild(link);

            // Trigger a click event on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Release the Blob URL
            URL.revokeObjectURL(url);

            console.log("Notes Exported");
        } else {
            console.log("Download cancelled by the user.");
        }
    }

    function readEncryptedFile(pw, content) {

        const encryptedContent = content;

        // Prompt the user for the password
        const password = pw;

        if (password) {
            try {
                // Decrypt the content using the password
                const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
                const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);

                // Parse the decrypted JSON string back to an array
                const noteList = JSON.parse(decryptedContent);
                console.log("Notes Decrypted Succefully");
                setNoteList(noteList);

                // Use the decrypted noteList as needed
            } catch (error) {
                console.error("Decryption failed:", error);
                alert("Failed to decrypt the file. Password or Input is invalid")
            }
        }

    }





    return (<>
        <h1 style={h1style}>Take a Note!</h1>
        <Search />
        <div>
            <Buttons notes={noteList} setNotes={setNoteList} download={downloadNotes} setFilter={setAppliedFilter} />
            {filteredNotes()}
            <div style={noteContainer}>

                {isEmpty ? <p>It seems lonely here, start by creating notes</p> : null}
                {renderNotes()}


            </div>
            {/* debug purposes */}
            <h3>Notes Object Array</h3>
            <p>
                {JSON.stringify(noteList, null, 2)}
            </p>
            <FileUpload import={readEncryptedFile} />

        </div>
    </>
    )
};

export default NotesContainer;