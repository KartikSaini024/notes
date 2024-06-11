import React, { useState, useEffect } from 'react';
import Save from './Save.jsx';
import FilterMenu from './FilterMenu.jsx';
import SortMenu from './SortMenu.jsx';
import closeEye from './assets/close-eye.png';
import openEye from './assets/open-eye.png';
import filterIcon from './assets/filter.png';
import sortIcon from './assets/sort.png';
import AddNote from './AddNote.jsx'

function Buttons(props) {

  // CREAT NOTE BUTTON
  function addNote() {
    let addNoteWindow = document.querySelector('#create-note');
    addNoteWindow.style.display = 'block';

  }


  // SORT BUTTON
  const [sortOptions, setSortOptions] = useState(false);

  function showSortMenu() {
    const elements = document.querySelector('#sort-options');

    setSortOptions(!sortOptions); //changes the state, but changes reflect after function ends. React batches the all state changes then renders after function to save performance.
    let updatedToggle = !sortOptions; // so we store the changed value in another variable to use it.
    if (updatedToggle) {
      elements.style.display = "flex";
    }
    else {
      elements.style.display = "none";
    }
    console.log("Sort menu Toggled, set as flex:" + updatedToggle )
  }

  


  // TOGGLE PREVIEW BUTTON 
  // useState is used to change value of a variable and render it live in DOM
  const [isToggled, setIsToggled] = useState(true);
  const [previewIcon, setPreviewIcon] = useState(openEye);

  function tog() {
    const elements = document.querySelectorAll('.toggle-preview');

    // Toggle the state
    setIsToggled(!isToggled);

    // Update the preview icon based on the current state
    if (isToggled) {
      elements.forEach(element => {
        element.style.display = 'none';
      });
      setPreviewIcon(closeEye);
    } else {
      elements.forEach(element => {
        element.style.display = 'block';
      });
      setPreviewIcon(openEye);
    }
  }

  // FILTER BUTTON
  const [filterOptions, toggleFilterOptions] = useState(false);

  function showFilterMenu() {
    const elements = document.querySelector('#filter-options-component');

    toggleFilterOptions(!filterOptions); //changes the state, but changes reflect after function ends. React batches the all state changes then renders after function to save performance.
    let updatedToggle = !filterOptions; // so we store the changed value in another variable to use it.
    if (updatedToggle) {
      elements.style.display = "flex";
    }
    else {
      elements.style.display = "none";
    }

    console.log("Filter menu Toggled, set as flex:" + updatedToggle )
  }



  const btns = {
    userSelect: "none",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  }

  const btnStyle = {
    display: "flex",
    gap: "5px",
    justifyContent: "center",
    alignItems: "center",
  }

  const img = {
    width: "25px",
    filter: "invert(80%) sepia(100%) saturate(7484%) hue-rotate(180deg) brightness(105%) contrast(108%)"
  }



  return (
    <>
      <div style={btns}>

        <AddNote btnstyle={btnStyle} updateNoteList={props.setNotes} currentNotes={props.notes} />

        <div id="sort-menu">
          <button className='flex-center btn-hover' style={btnStyle} onClick={showSortMenu}>Sort<img src={sortIcon} alt="icon" id='sort-btn' className='button-icon' /></button>

          <SortMenu toggleMenu={showSortMenu} noteList={props.notes} setNoteList={props.setNotes}/>

        </div>

        <div id='filter-menu'>
          <button className='flex-center btn-hover' style={btnStyle} onClick={showFilterMenu}>
            Filter<img src={filterIcon} alt="icon" id='filter-btn' className='button-icon' />
          </button>

          <FilterMenu setFilter={props.setFilter} toggleMenu={showFilterMenu} />

        </div>

        <button onClick={(e) => tog(e)} className='flex-center btn-hover' style={btnStyle}>Toggle Preview<img src={previewIcon} alt="icon" id='preview-btn' className='button-icon' /></button>

        <Save download={props.download}/>
      </div>
    </>
  )
}

export default Buttons
