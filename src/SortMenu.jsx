import React, { useState, useEffect } from 'react';

function SortMenu(props) {
  const [selectedSort, setSelectedSort] = useState("");

  function sortOldestToLatest() {
    return [...props.noteList].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  function sortLatestToOldest() {
    return sortOldestToLatest().reverse();
  }

  function sortChangedOldestToLatest() {
    return [...props.noteList].sort((a, b) => new Date(a.dateModified) - new Date(b.dateModified));
  }

  function sortChangedLatestToOldest() {
    return sortChangedOldestToLatest().reverse();
  }

  useEffect(() => {
    let newNotes;
    switch (selectedSort) {
      case "newToOld":
        newNotes = sortLatestToOldest();
        console.log("Sorted by date (Latest to Oldest):", newNotes);
        break;
      case "oldToNew":
        newNotes = sortOldestToLatest();
        console.log("Sorted by date (Oldest to Newest):", newNotes);
        break;
      case "lastModified":
        newNotes = sortChangedLatestToOldest();
        console.log("Sorted by Modified (Latest to Oldest):", newNotes);
        break;
      case "oldModified":
        newNotes = sortChangedOldestToLatest();
        console.log("Sorted by Modified (Oldest to Newest):", newNotes);
        break;
      default:
        return;
    }
    props.setNoteList(newNotes);
    if (props.toggleMenu) {
      props.toggleMenu(); // Ensure toggleMenu is defined before calling
    }
  }, [selectedSort]);

  return (
    <div id="sort-options">
      <div>
        <button
          className={`sort-button ${selectedSort === "newToOld" ? 'selected' : ''}`}
          onClick={() => setSelectedSort("newToOld")}
        >
          Date (Latest to Oldest)
        </button>
      </div>
      <div>
        <button
          className={`sort-button ${selectedSort === "oldToNew" ? 'selected' : ''}`}
          onClick={() => setSelectedSort("oldToNew")}
        >
          Date (Oldest to Newest)
        </button>
      </div>
      <div>
        <button
          className={`sort-button ${selectedSort === "lastModified" ? 'selected' : ''}`}
          onClick={() => setSelectedSort("lastModified")}
        >
          Modified (Latest to Oldest)
        </button>
      </div>
      <div>
        <button
          className={`sort-button ${selectedSort === "oldModified" ? 'selected' : ''}`}
          onClick={() => setSelectedSort("oldModified")}
        >
          Modified (Oldest to Latest)
        </button>
      </div>
    </div>
  );
}

export default SortMenu;
